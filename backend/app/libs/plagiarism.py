








































import os
import requests
import pandas as pd
from bs4 import BeautifulSoup
from warcio.archiveiterator import ArchiveIterator
from io import BytesIO
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List










# ---------- Local DB Corpus Comparison ----------
def local_plagiarism_score(new_text: str, corpus_texts: list[str]) -> float:
    """
    Compare text against a local list of corpus texts using TF-IDF + cosine similarity.
    """
    if not corpus_texts:
        return 0.0

    texts = [new_text] + corpus_texts
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf = vectorizer.fit_transform(texts)
    sim_scores = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()
    return (sim_scores.max() if len(sim_scores) > 0 else 0.0) * 100


# ---------- Common Crawl Helpers ----------
def search_commoncrawl_urls(query: str, limit: int = 5) -> list[str]:
    """
    Searches Common Crawl index API for pages containing the query.
    Returns a list of matching URLs (up to `limit`).
    """
    api_url = (
        f"https://index.commoncrawl.org/CC-MAIN-2024-50-index"
        f"?url={requests.utils.quote(query)}&matchType=phrase&output=json"
    )

    urls = []
    try:
        resp = requests.get(api_url, timeout=10)
        if resp.status_code == 200:
            lines = resp.text.strip().split("\n")
            for line in lines:
                if len(urls) >= limit:
                    break
                try:
                    data = pd.read_json(BytesIO(line.encode()), typ="series")
                    if "url" in data:
                        urls.append(data["url"])
                except Exception:
                    pass
    except Exception:
        pass

    return urls


def fetch_page_text(url: str) -> str:
    """
    Downloads a web page and extracts visible text.
    """
    try:
        resp = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
        if resp.status_code == 200:
            soup = BeautifulSoup(resp.text, "html.parser")
            for script in soup(["script", "style"]):
                script.extract()
            text = soup.get_text(separator=" ", strip=True)
            return text
    except Exception:
        pass
    return ""


def get_corpus_from_commoncrawl(query: str, limit: int = 5) -> list[str]:
    """
    Given a search query (from your new text),
    returns a list of page texts from Common Crawl.
    """
    urls = search_commoncrawl_urls(query, limit=limit)
    corpus = []
    for url in urls:
        page_text = fetch_page_text(url)
        if page_text:
            corpus.append(page_text)
    return corpus


# ---------- Common Crawl Plagiarism Check ----------
def local_plagiarism_score_with_commoncrawl(new_text: str) -> float:
    """
    Compare new_text with top Common Crawl results.
    """
    corpus_texts = get_corpus_from_commoncrawl(new_text)
    if not corpus_texts:
        return 0.0

    texts = [new_text] + corpus_texts
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf = vectorizer.fit_transform(texts)
    sim_scores = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()
    return (sim_scores.max() if len(sim_scores) > 0 else 0.0) * 100


COMMONCRAWL = {
    "MAX_RESULTS": int(os.getenv("COMMONCRAWL_MAX_RESULTS", 5)),
    "REQUEST_TIMEOUT": int(os.getenv("COMMONCRAWL_TIMEOUT", 10)),
}



# def normalize_scores(ai: float, web: float, local: float) -> tuple[float, float, float, float]:
#     strongest = max(ai, web, local)
#     human = max(0.0, 100.0 - strongest)
#     return (
#         round(ai, 2),
#         round(web, 2),
#         round(local, 2),
#         round(human, 2)
#     )




def normalize_scores(ai: float, web: float) -> tuple[float, float, float]:
    """
    Enforces:
    - AI + Web + Original = 100
    - AI and Web are independent
    - Original is the remaining portion
    """

    # Clamp inputs
    ai = max(0.0, min(100.0, ai))
    web = max(0.0, min(100.0, web))

    # If combined exceeds 100, scale BOTH proportionally
    total = ai + web
    if total > 100.0:
        scale = 100.0 / total
        ai *= scale
        web *= scale

    human = max(0.0, 100.0 - ai - web)

    return round(ai, 2), round(web, 2), round(human, 2)


def build_web_source_tokens(urls: List[str]) -> List[str]:
    """
    Converts URLs into DB-safe attribution tokens.
    """
    seen = set()
    tokens = []

    for url in urls:
        if not url or not isinstance(url, str):
            continue
        if url in seen:
            continue
        seen.add(url)
        tokens.append(f"web::{url}")

    return tokens















# # backend/app/libs/plagiarism.py

# import os
# import re
# import math
# import requests
# from typing import List, Dict, Tuple
# from collections import Counter
# from bs4 import BeautifulSoup
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity


# # ============================================================
# # CONFIG (SAFE, EXPLAINABLE)
# # ============================================================

# MIN_TOKENS = 40
# MIN_OVERLAP_TOKENS = 15
# MIN_SIMILARITY_THRESHOLD = 0.18
# MAX_SINGLE_SOURCE_WEIGHT = 0.85

# COMMONCRAWL_MAX_RESULTS = int(os.getenv("COMMONCRAWL_MAX_RESULTS", 5))
# REQUEST_TIMEOUT = int(os.getenv("COMMONCRAWL_TIMEOUT", 10))


# # ============================================================
# # TEXT NORMALIZATION
# # ============================================================

# def normalize_text(text: str) -> List[str]:
#     if not text:
#         return []

#     text = text.lower()
#     text = re.sub(r"[^a-z0-9\s]", " ", text)
#     text = re.sub(r"\s+", " ", text).strip()
#     return text.split()


# # ============================================================
# # SAFE COSINE
# # ============================================================

# def cosine_sim(tokens_a: List[str], tokens_b: List[str]) -> float:
#     if not tokens_a or not tokens_b:
#         return 0.0

#     vec_a = Counter(tokens_a)
#     vec_b = Counter(tokens_b)

#     dot = sum(vec_a[t] * vec_b.get(t, 0) for t in vec_a)
#     if dot == 0:
#         return 0.0

#     norm_a = math.sqrt(sum(v * v for v in vec_a.values()))
#     norm_b = math.sqrt(sum(v * v for v in vec_b.values()))

#     if norm_a == 0 or norm_b == 0:
#         return 0.0

#     return dot / (norm_a * norm_b)


# # ============================================================
# # LENGTH-AWARE SIMILARITY
# # ============================================================

# def length_weighted_similarity(
#     source_tokens: List[str],
#     target_tokens: List[str]
# ) -> float:

#     if len(source_tokens) < MIN_TOKENS or len(target_tokens) < MIN_TOKENS:
#         return 0.0

#     overlap = set(source_tokens) & set(target_tokens)
#     if len(overlap) < MIN_OVERLAP_TOKENS:
#         return 0.0

#     cosine = cosine_sim(source_tokens, target_tokens)
#     coverage = len(overlap) / len(source_tokens)

#     score = cosine * coverage
#     return min(score, MAX_SINGLE_SOURCE_WEIGHT)


# # ============================================================
# # CORE ATTRIBUTION ENGINE
# # ============================================================

# def compute_similarity_with_sources(
#     text: str,
#     sources: List[Dict[str, str]]
# ) -> Tuple[float, List[Dict[str, float]]]:

#     source_tokens = normalize_text(text)
#     if len(source_tokens) < MIN_TOKENS:
#         return 0.0, []

#     matches = []

#     for src in sources:
#         target_tokens = normalize_text(src["text"])
#         sim = length_weighted_similarity(source_tokens, target_tokens)

#         if sim >= MIN_SIMILARITY_THRESHOLD:
#             matches.append({
#                 "source_type": src["type"],
#                 "identifier": src["id"],
#                 "score": round(sim * 100, 2)
#             })

#     max_score = max((m["score"] for m in matches), default=0.0)
#     return max_score, matches


# # ============================================================
# # LOCAL DB PLAGIARISM
# # ============================================================

# def local_plagiarism_score(
#     new_text: str,
#     corpus_texts: List[str]
# ) -> float:
#     """
#     Compatibility wrapper — returns SCORE ONLY.
#     Attribution handled internally.
#     """

#     sources = [
#         {"type": "local_db", "id": f"document:{i}", "text": t}
#         for i, t in enumerate(corpus_texts)
#     ]

#     score, _ = compute_similarity_with_sources(new_text, sources)
#     return score


# # ============================================================
# # COMMON CRAWL
# # ============================================================

# def fetch_page_text(url: str) -> str:
#     try:
#         resp = requests.get(
#             url,
#             timeout=REQUEST_TIMEOUT,
#             headers={"User-Agent": "Mozilla/5.0"}
#         )
#         if resp.status_code != 200:
#             return ""

#         soup = BeautifulSoup(resp.text, "html.parser")
#         for tag in soup(["script", "style", "nav", "footer"]):
#             tag.extract()

#         return soup.get_text(" ", strip=True)
#     except Exception:
#         return ""


# def search_commoncrawl_urls(query: str) -> List[str]:
#     api = (
#         "https://index.commoncrawl.org/CC-MAIN-2024-50-index"
#         f"?url={requests.utils.quote(query[:80])}"
#         "&matchType=domain&output=json"
#     )

#     urls = []
#     try:
#         r = requests.get(api, timeout=REQUEST_TIMEOUT)
#         for line in r.text.splitlines():
#             if len(urls) >= COMMONCRAWL_MAX_RESULTS:
#                 break
#             if '"url"' in line:
#                 urls.append(eval(line).get("url"))
#     except Exception:
#         pass

#     return urls


# def local_plagiarism_score_with_commoncrawl(new_text: str) -> float:
#     urls = search_commoncrawl_urls(new_text)
#     sources = []

#     for url in urls:
#         text = fetch_page_text(url)
#         if text:
#             sources.append({
#                 "type": "commoncrawl",
#                 "id": url,
#                 "text": text
#             })

#     score, _ = compute_similarity_with_sources(new_text, sources)
#     return score


# # ============================================================
# # NORMALIZATION (USED BY MAIN)
# # ============================================================

# def normalize_scores(ai: float, web: float) -> tuple[float, float, float]:
#     ai = max(0.0, min(100.0, ai))
#     web = max(0.0, min(100.0, web))

#     total = ai + web
#     if total > 100.0:
#         scale = 100.0 / total
#         ai *= scale
#         web *= scale

#     human = max(0.0, 100.0 - ai - web)
#     return round(ai, 2), round(web, 2), round(human, 2)









































































# # backend/app/libs/plagiarism.py

# from typing import List
# import math
# import re
# from collections import Counter

# # =========================
# # CONFIG — SAFE DEFAULTS
# # =========================

# MIN_TOKENS = 10                 # Ignore very short texts
# MIN_OVERLAP_TOKENS = 5         # Minimum shared tokens to count plagiarism
# MAX_SINGLE_SOURCE_WEIGHT = 0.85 # Prevent one tiny source dominating score


# # =========================
# # TEXT NORMALIZATION
# # =========================

# def normalize_text(text: str) -> List[str]:
#     """
#     Normalize text into tokens safely:
#     - lowercase
#     - remove punctuation
#     - preserve word boundaries
#     """
#     if not text:
#         return []

#     text = text.lower()
#     text = re.sub(r"[^a-z0-9\s]", " ", text)
#     text = re.sub(r"\s+", " ", text).strip()

#     return text.split()


# # =========================
# # SIMILARITY CORE
# # =========================

# def cosine_similarity(tokens_a: List[str], tokens_b: List[str]) -> float:
#     """
#     Safe cosine similarity:
#     - length-aware
#     - zero-division safe
#     - ignores empty vectors
#     """
#     if not tokens_a or not tokens_b:
#         return 0.0

#     vec_a = Counter(tokens_a)
#     vec_b = Counter(tokens_b)

#     # Dot product
#     dot = sum(vec_a[t] * vec_b.get(t, 0) for t in vec_a)

#     if dot == 0:
#         return 0.0

#     norm_a = math.sqrt(sum(v * v for v in vec_a.values()))
#     norm_b = math.sqrt(sum(v * v for v in vec_b.values()))

#     if norm_a == 0 or norm_b == 0:
#         return 0.0

#     return dot / (norm_a * norm_b)


# # =========================
# # LENGTH-AWARE SCORING
# # =========================

# def length_weighted_similarity(
#     source_tokens: List[str],
#     target_tokens: List[str]
# ) -> float:
#     """
#     Prevents:
#     - tiny snippets → 100%
#     - boilerplate domination
#     - short text explosion
#     """

#     if len(source_tokens) < MIN_TOKENS or len(target_tokens) < MIN_TOKENS:
#         return 0.0

#     overlap = set(source_tokens) & set(target_tokens)

#     if len(overlap) < MIN_OVERLAP_TOKENS:
#         return 0.0

#     cosine = cosine_similarity(source_tokens, target_tokens)

#     # Scale by relative length coverage
#     coverage = len(overlap) / len(source_tokens)

#     score = cosine * coverage

#     return min(score, MAX_SINGLE_SOURCE_WEIGHT)


# # =========================
# # PUBLIC FUNCTIONS
# # =========================

# def local_plagiarism_score(
#     text: str,
#     comparison_texts: List[str]
# ) -> float:
#     """
#     Computes plagiarism % against local DB or web texts.

#     ✔ length-aware
#     ✔ overlap-aware
#     ✔ prevents identical-score syndrome
#     ✔ returns COVERAGE %, not probability
#     """

#     source_tokens = normalize_text(text)

#     if len(source_tokens) < MIN_TOKENS:
#         return 0.0

#     max_similarity = 0.0

#     for other in comparison_texts:
#         target_tokens = normalize_text(other)
#         sim = length_weighted_similarity(source_tokens, target_tokens)
#         max_similarity = max(max_similarity, sim)

#     return round(max_similarity * 100.0, 2)


# def local_plagiarism_score_with_commoncrawl(text: str) -> float:
#     """
#     Stub kept for compatibility.
#     Replace internals if CommonCrawl backend is enabled.
#     """

#     # Defensive default — NEVER auto-inflate
#     if not text or len(text.split()) < MIN_TOKENS:
#         return 0.0

#     # If CommonCrawl is wired later, plug results here
#     return 0.0
























# # backend/app/libs/plagiarism.py

# from typing import List
# import math
# import re
# from collections import Counter

# # ============================================================
# # CONFIG — SAFE, EXPLAINABLE DEFAULTS
# # ============================================================

# MIN_TOKENS = 30                 # Ignore very short texts
# MIN_OVERLAP_TOKENS = 12         # Minimum shared tokens to count plagiarism
# MAX_SINGLE_SOURCE_WEIGHT = 0.85 # Prevent one tiny source from giving 100%


# # ============================================================
# # TEXT NORMALIZATION
# # ============================================================

# def normalize_text(text: str) -> List[str]:
#     """
#     Normalize text safely:
#     - lowercase
#     - remove punctuation
#     - preserve word boundaries
#     """
#     if not text:
#         return []

#     text = text.lower()
#     text = re.sub(r"[^a-z0-9\s]", " ", text)
#     text = re.sub(r"\s+", " ", text).strip()

#     return text.split()


# # ============================================================
# # CORE SIMILARITY (COSINE, SAFE)
# # ============================================================

# def cosine_similarity(tokens_a: List[str], tokens_b: List[str]) -> float:
#     """
#     Cosine similarity with guards:
#     - no empty vectors
#     - no divide-by-zero
#     """
#     if not tokens_a or not tokens_b:
#         return 0.0

#     vec_a = Counter(tokens_a)
#     vec_b = Counter(tokens_b)

#     dot = sum(vec_a[t] * vec_b.get(t, 0) for t in vec_a)
#     if dot == 0:
#         return 0.0

#     norm_a = math.sqrt(sum(v * v for v in vec_a.values()))
#     norm_b = math.sqrt(sum(v * v for v in vec_b.values()))

#     if norm_a == 0 or norm_b == 0:
#         return 0.0

#     return dot / (norm_a * norm_b)


# # ============================================================
# # LENGTH-AWARE SCORING (THE IMPORTANT FIX)
# # ============================================================

# def length_weighted_similarity(
#     source_tokens: List[str],
#     target_tokens: List[str]
# ) -> float:
#     """
#     Prevents:
#     ❌ Short snippets → 100%
#     ❌ Boilerplate domination
#     ❌ Identical-score syndrome
#     """

#     # Reject short text
#     if len(source_tokens) < MIN_TOKENS or len(target_tokens) < MIN_TOKENS:
#         return 0.0

#     overlap = set(source_tokens) & set(target_tokens)

#     # Reject trivial overlaps
#     if len(overlap) < MIN_OVERLAP_TOKENS:
#         return 0.0

#     cosine = cosine_similarity(source_tokens, target_tokens)

#     # Coverage = how much of SOURCE is covered by TARGET
#     coverage = len(overlap) / len(source_tokens)

#     score = cosine * coverage

#     return min(score, MAX_SINGLE_SOURCE_WEIGHT)


# # ============================================================
# # PUBLIC API — LOCAL / WEB / DB PLAGIARISM
# # ============================================================

# def local_plagiarism_score(
#     text: str,
#     comparison_texts: List[str]
# ) -> float:
#     """
#     Returns plagiarism as COVERAGE %, not probability.

#     ✔ Different documents → different scores
#     ✔ Length-aware
#     ✔ Overlap-aware
#     ✔ No auto-100%
#     """

#     source_tokens = normalize_text(text)

#     if len(source_tokens) < MIN_TOKENS:
#         return 0.0

#     max_similarity = 0.0

#     for other_text in comparison_texts:
#         target_tokens = normalize_text(other_text)
#         sim = length_weighted_similarity(source_tokens, target_tokens)
#         max_similarity = max(max_similarity, sim)

#     return round(max_similarity * 100.0, 2)


# def local_plagiarism_score_with_commoncrawl(text: str) -> float:
#     """
#     Stub for CommonCrawl.

#     Defensive by design:
#     - NEVER inflates score
#     - Returns 0 until real CC integration exists
#     """

#     if not text or len(text.split()) < MIN_TOKENS:
#         return 0.0

#     return 0.0
