














"""
Safe Ensemble AI Content Detection
---------------------------------
Lazy-loaded models (FastAPI safe)
"""

import math
import torch
import numpy as np
from typing import List
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    AutoModelForCausalLM,
)

# =========================
# CONFIG
# =========================

ROBERTA_MODEL_NAME = "roberta-base-openai-detector"
PERPLEXITY_MODEL_NAME = "gpt2"

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# =========================
# LAZY GLOBALS (IMPORTANT)
# =========================

_roberta_model = None
_roberta_tokenizer = None
_ppl_model = None
_ppl_tokenizer = None


# =========================
# MODEL LOADERS
# =========================

def _load_roberta():
    global _roberta_model, _roberta_tokenizer
    if _roberta_model is None:
        _roberta_tokenizer = AutoTokenizer.from_pretrained(ROBERTA_MODEL_NAME)
        _roberta_model = (
            AutoModelForSequenceClassification
            .from_pretrained(ROBERTA_MODEL_NAME)
            .to(DEVICE)
            .eval()
        )

def _load_ppl():
    global _ppl_model, _ppl_tokenizer
    if _ppl_model is None:
        _ppl_tokenizer = AutoTokenizer.from_pretrained(PERPLEXITY_MODEL_NAME)
        _ppl_model = (
            AutoModelForCausalLM
            .from_pretrained(PERPLEXITY_MODEL_NAME)
            .to(DEVICE)
            .eval()
        )

# =========================
# UTILITIES
# =========================

def _chunk(words: List[str], size=200):
    return [" ".join(words[i:i + size]) for i in range(0, len(words), size)]

def _softmax_confidence(logits):
    probs = torch.softmax(logits, dim=-1)
    return probs[:, 1].item()  # AI class

# =========================
# SIGNALS
# =========================

def _roberta_score(text: str) -> float:
    _load_roberta()

    words = text.split()
    if len(words) < 20:
        return 0.0

    scores = []
    chunks = _chunk(words)

    with torch.no_grad():
        for c in chunks:
            inputs = _roberta_tokenizer(
                c, return_tensors="pt", truncation=True, max_length=512
            ).to(DEVICE)
            outputs = _roberta_model(**inputs)
            scores.append(_softmax_confidence(outputs.logits))

    return float(np.mean(scores) * 100.0)

def _perplexity_score(text: str) -> float:
    _load_ppl()

    if len(text.split()) < 20:
        return 100.0

    enc = _ppl_tokenizer(
        text, return_tensors="pt", truncation=True, max_length=512
    ).to(DEVICE)

    with torch.no_grad():
        loss = _ppl_model(**enc, labels=enc["input_ids"]).loss

    ppl = math.exp(loss.item())
    ppl = max(10.0, min(ppl, 300.0))
    return float(100.0 * (1.0 - (ppl - 10.0) / 290.0))

def _burstiness_score(text: str) -> float:
    sentences = [s for s in text.split(".") if len(s.split()) > 5]
    if len(sentences) < 3:
        return 50.0

    entropies = []
    for s in sentences:
        words = s.split()
        freqs = {}
        for w in words:
            freqs[w] = freqs.get(w, 0) + 1
        probs = np.array(list(freqs.values())) / len(words)
        entropies.append(-np.sum(probs * np.log2(probs)))

    variance = np.var(entropies)
    variance = min(2.0, max(0.0, variance))
    return float(100.0 * (1.0 - variance / 2.0))

# =========================
# PUBLIC API (IMPORTANT)
# =========================

def detect_ai_content(text: str) -> float:
    """
    Returns AI probability 0..100
    SAFE for FastAPI reload
    """

    roberta = _roberta_score(text)
    perplexity = _perplexity_score(text)
    burstiness = _burstiness_score(text)

    score = (
        0.45 * roberta +
        0.35 * perplexity +
        0.20 * burstiness
    )

    # Agreement-based boost
    if roberta > 8 and perplexity > 60:
        score += 20
    if roberta > 15 and burstiness > 65:
        score += 15
    if roberta > 25:
        score += 10

    return round(min(score, 95.0), 2)
