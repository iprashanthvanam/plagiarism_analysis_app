

# import os
# import mimetypes
# from google import genai
# from google.genai.errors import APIError
# from app.env import GEMINI_API_KEY
# from pydantic import BaseModel
# from typing import Optional, List
# import asyncio
# import pdfplumber
# from PIL import Image as PILImage
# import re
# from io import BytesIO
# import tempfile
# import shutil
# import unicodedata
# import logging
# from app.env import GEMINI_API_KEY
# from google import genai
# from dotenv import load_dotenv
# import os

# load_dotenv()

# PDF_MAX_PAGES = int(os.getenv("PDF_MAX_PAGES", 10))
# PDF_RENDER_DPI = int(os.getenv("PDF_RENDER_DPI", 150))
# GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")




# # --- Configure Logging ---
# logging.basicConfig(
#     level=logging.INFO,
#     format="%(asctime)s [%(levelname)s] %(message)s",
#     encoding="utf-8"
# )
# logger = logging.getLogger(__name__)

# # --- Configuration and Initialization ---
# class TextExtractionResult(BaseModel):
#     extracted_text: str

# # # Check for conflicting API keys
# # if os.getenv("GOOGLE_API_KEY") and GEMINI_API_KEY:
# #     logger.warning(
# #         "Both GOOGLE_API_KEY and GEMINI_API_KEY are set. Using GEMINI_API_KEY for Gemini API. "
# #         "To avoid conflicts, ensure only GEMINI_API_KEY is set in .env or environment variables."
# #     )

# # Validate API key presence
# if not GEMINI_API_KEY:
#     logger.error("GEMINI_API_KEY is not set in environment variables.")
#     client = None
# else:
#     try:
#         client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

#         # client = genai.Client(api_key=GEMINI_API_KEY)
#     except Exception as e:
#         logger.error(f"Failed to initialize Gemini Client: {e}")
#         client = None

# # --- JSON Extraction Helper ---
# def _extract_json_from_response(response_text: str) -> Optional[str]:
#     """
#     Extracts the first valid JSON object from the response text using brace counting.
#     Handles cases where the response contains extraneous text or malformed JSON.
#     """
#     text = response_text.strip()
#     start = text.find("{")
#     if start == -1:
#         return None

#     brace_count = 0
#     for i, ch in enumerate(text[start:], start=start):
#         if ch == "{":
#             brace_count += 1
#         elif ch == "}":
#             brace_count -= 1
#             if brace_count == 0:
#                 json_str = text[start:i+1]
#                 # Verify JSON validity
#                 try:
#                     TextExtractionResult.model_validate_json(json_str)
#                     return json_str
#                 except Exception:
#                     return None
#     return None

# # --- PDF Helper (Synchronous, to run in a thread) ---
# def _get_pdf_page_images_sync(file_path: str) -> List[str]:
#     """
#     Converts up to 10 PDF pages to temporary PNG files and returns their paths.
#     Uses pdfplumber for page extraction and PIL for image conversion.
#     """
#     image_paths = []
#     temp_dir = tempfile.mkdtemp()

#     try:
#         with pdfplumber.open(file_path) as pdf:
#             limit = min(len(pdf.pages), 10)
#             logger.info(f"Converting {limit} PDF pages to temporary files...")

#             base_name = os.path.splitext(os.path.basename(file_path))[0]

#             for i, page in enumerate(pdf.pages[:limit]):
#                 try:
#                     im = page.to_image(resolution=150).original
#                     temp_path = os.path.join(temp_dir, f"{base_name}_page_{i+1}.png")
#                     im.save(temp_path, format="PNG")
#                     image_paths.append(temp_path)
#                 except Exception as e:
#                     logger.warning(f"Failed to convert PDF page {i+1}: {e}")
#                     continue

#         if not image_paths:
#             logger.error("No PDF pages could be converted to images.")
#     except Exception as e:
#         logger.error(f"Failed to process PDF file: {e}")

#     return image_paths

# # --- Text Normalization Helper ---
# def normalize_text(text: str) -> str:
#     """
#     Normalizes text to handle encoding issues by attempting multiple decoding strategies.
#     Falls back to ASCII, then latin-1, and removes invalid characters.
#     """
#     try:
#         # Try NFKD normalization and ASCII encoding
#         normalized = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
#         return normalized
#     except Exception:
#         try:
#             # Fallback to latin-1 decoding
#             normalized = unicodedata.normalize("NFKD", text).encode("latin-1", "ignore").decode("latin-1")
#             return normalized
#         except Exception as e:
#             logger.warning(f"Text normalization failed: {e}. Returning original text.")
#             return text

# # --- Core Gemini Extraction Logic ---
# async def extract_text_with_gemini(file_path: str, is_pdf: bool) -> str:
#     """
#     Extracts text from a file using Gemini API. Supports PDF (via image conversion) and image files (PNG/JPG).
#     Returns normalized extracted text or an error message.
#     """
#     if not client:
#         return "ERROR: Gemini Client not initialized. Check GEMINI_API_KEY."

#     # Validate file existence and type
#     if not os.path.exists(file_path):
#         return f"ERROR: File not found: {file_path}"

#     mime_type, _ = mimetypes.guess_type(file_path)
#     if not mime_type:
#         return f"ERROR: Could not determine MIME type for file: {file_path}"
    
#     if is_pdf and mime_type != "application/pdf":
#         return f"ERROR: Expected PDF file, but got MIME type: {mime_type}"
#     elif not is_pdf and mime_type not in ["image/png", "image/jpeg"]:
#         return f"ERROR: Unsupported file type: {mime_type}. Expected PNG or JPG."

#     uploaded_files = []
#     temp_paths = []

#     try:
#         if is_pdf:
#             # Convert PDF to images
#             image_paths = await asyncio.to_thread(_get_pdf_page_images_sync, file_path)
#             temp_paths.extend(image_paths)

#             if not image_paths:
#                 return "ERROR: PDF conversion failed or no pages found."

#             # Upload each image to Gemini
#             for img_path in image_paths:
#                 try:
#                     uploaded_file = client.files.upload(file=img_path)
#                     uploaded_files.append(uploaded_file)
#                     logger.info(f"Uploaded image: {img_path}")
#                 except Exception as e:
#                     logger.warning(f"Failed to upload image {img_path}: {e}")
#                     continue

#             if not uploaded_files:
#                 return "ERROR: No PDF page images could be uploaded to Gemini."

#             prompt = (
#                 "You are an expert document intelligence system. "
#                 "Extract ALL text content from these PDF pages, strictly preserving reading order and major sections. "
#                 "Return clean text without any Markdown formatting or commentary outside the JSON structure."
#             )
#             contents = [prompt, *uploaded_files]

#         else:
#             # Single image file (PNG/JPG)
#             try:
#                 uploaded_file = client.files.upload(file=file_path)
#                 uploaded_files.append(uploaded_file)
#                 logger.info(f"Uploaded file: {file_path}")
#             except Exception as e:
#                 return f"ERROR: Failed to upload file {file_path}: {e}"

#             prompt = (
#                 "You are an expert document intelligence system. "
#                 "Extract ALL text content from this image, preserving readability and structure. "
#                 "Return clean text without any Markdown formatting or commentary outside the JSON structure."
#             )
#             contents = [prompt, uploaded_file]

#         # Make the API call
#         response = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=contents,
#             config={
#                 "response_mime_type": "application/json",
#                 "response_schema": TextExtractionResult,
#             },
#         )

#         # Extract and validate JSON response
#         json_string = _extract_json_from_response(response.text)
#         if not json_string:
#             return f"ERROR: Gemini structured output failed. Raw response: {response.text[:200]}..."

#         try:
#             result = TextExtractionResult.model_validate_json(json_string)
#             # Normalize extracted text to handle encoding issues
#             return normalize_text(result.extracted_text)
#         except Exception as ve:
#             return f"ERROR: JSON validation failed. Extracted string: {json_string[:200]}... | Details: {ve}"

#     except APIError as e:
#         error_msg = (
#             f"ERROR: Gemini API Call Failed: 400 Invalid Argument. "
#             f"This often indicates an unsupported file format or API configuration issue. Details: {e}"
#         )
#         logger.error(error_msg)
#         return error_msg

#     except Exception as e:
#         error_msg = f"ERROR: Gemini Processing Failed (Unknown): {e}"
#         logger.error(error_msg)
#         return error_msg

#     finally:
#         # Cleanup remote files
#         for f in uploaded_files:
#             try:
#                 client.files.delete(name=f.name)
#                 logger.info(f"Deleted uploaded file: {f.name}")
#             except Exception:
#                 pass

#         # Cleanup local temporary files
#         if temp_paths:
#             try:
#                 parent_dir = os.path.dirname(temp_paths[0])
#                 shutil.rmtree(parent_dir)
#                 logger.info(f"Cleaned up temporary directory: {parent_dir}")
#             except Exception as e:
#                 logger.warning(f"Failed to clean up temporary directory: {e}")















import os
import mimetypes
import asyncio
import tempfile
import shutil
import hashlib
import logging
import unicodedata
from typing import Optional, List

import pdfplumber
from pydantic import BaseModel
from google import genai
from google.genai.errors import APIError
from dotenv import load_dotenv

# =========================
# ENV & CONFIG
# =========================
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
PDF_MAX_PAGES = int(os.getenv("PDF_MAX_PAGES", 10))
PDF_RENDER_DPI = int(os.getenv("PDF_RENDER_DPI", 150))

# =========================
# LOGGING
# =========================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    encoding="utf-8",
)
logger = logging.getLogger(__name__)

# =========================
# GEMINI CLIENT (SAFE INIT)
# =========================
if not GEMINI_API_KEY:
    logger.error("GEMINI_API_KEY not set")
    client = None
else:
    try:
        client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        logger.error("Failed to initialize Gemini client: %s", e)
        client = None

# =========================
# RESPONSE MODEL
# =========================
class TextExtractionResult(BaseModel):
    extracted_text: str

# =========================
# SIMPLE IN-MEMORY CACHE
# =========================
_GEMINI_CACHE: dict[str, str] = {}

# =========================
# HELPERS
# =========================
def _hash_file(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()

def _normalize_text(text: str) -> str:
    try:
        return (
            unicodedata.normalize("NFKD", text)
            .encode("ascii", "ignore")
            .decode("ascii")
        )
    except Exception:
        return text

def _extract_json_from_response(response_text: str) -> Optional[str]:
    text = response_text.strip()
    start = text.find("{")
    if start == -1:
        return None

    brace_count = 0
    for i, ch in enumerate(text[start:], start=start):
        if ch == "{":
            brace_count += 1
        elif ch == "}":
            brace_count -= 1
            if brace_count == 0:
                candidate = text[start : i + 1]
                try:
                    TextExtractionResult.model_validate_json(candidate)
                    return candidate
                except Exception:
                    return None
    return None

def _pdf_to_images_sync(file_path: str) -> List[str]:
    temp_dir = tempfile.mkdtemp()
    image_paths: List[str] = []

    try:
        with pdfplumber.open(file_path) as pdf:
            for i, page in enumerate(pdf.pages[:PDF_MAX_PAGES]):
                try:
                    img = page.to_image(resolution=PDF_RENDER_DPI).original
                    out = os.path.join(temp_dir, f"page_{i+1}.png")
                    img.save(out, "PNG")
                    image_paths.append(out)
                except Exception as e:
                    logger.warning("PDF page %d failed: %s", i + 1, e)
    except Exception as e:
        logger.error("PDF processing failed: %s", e)

    return image_paths

# =========================
# CORE FUNCTION
# =========================
async def extract_text_with_gemini(file_path: str, is_pdf: bool) -> str:
    if not client:
        return "ERROR: Gemini client not initialized"

    if not os.path.exists(file_path):
        return "ERROR: File not found"

    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        return "ERROR: Unknown file type"

    if is_pdf and mime_type != "application/pdf":
        return f"ERROR: Expected PDF, got {mime_type}"
    if not is_pdf and mime_type not in ("image/png", "image/jpeg"):
        return f"ERROR: Unsupported image type {mime_type}"

    # =========================
    # CACHE CHECK
    # =========================
    file_hash = _hash_file(file_path)
    if file_hash in _GEMINI_CACHE:
        logger.info("Gemini cache hit")
        return _GEMINI_CACHE[file_hash]

    uploaded_files = []
    temp_paths = []

    try:
        # =========================
        # PREP INPUT FILES
        # =========================
        if is_pdf:
            temp_paths = await asyncio.to_thread(
                _pdf_to_images_sync, file_path
            )
            if not temp_paths:
                return "ERROR: PDF conversion failed"

            for img in temp_paths:
                uploaded_files.append(client.files.upload(file=img))
        else:
            uploaded_files.append(client.files.upload(file=file_path))

        # =========================
        # SINGLE GEMINI CALL
        # =========================
        prompt = (
            "You are an expert document intelligence system. "
            "Extract ALL readable text accurately. Preserve order. "
            "Return ONLY valid JSON: "
            '{ "extracted_text": "..." }'
        )

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=[prompt, *uploaded_files],
            config={
                "response_mime_type": "application/json",
                "response_schema": TextExtractionResult,
            },
        )

        json_str = _extract_json_from_response(response.text)
        if not json_str:
            return f"ERROR: Invalid Gemini JSON response: {response.text[:200]}"

        result = TextExtractionResult.model_validate_json(json_str)
        clean_text = _normalize_text(result.extracted_text)

        _GEMINI_CACHE[file_hash] = clean_text
        return clean_text

    except APIError as e:
        logger.error("Gemini API error: %s", e)
        return "ERROR: Gemini API failed"

    except Exception as e:
        logger.error("Unexpected Gemini failure: %s", e)
        return "ERROR: Gemini processing failed"

    finally:
        # =========================
        # CLEANUP
        # =========================
        for f in uploaded_files:
            try:
                client.files.delete(name=f.name)
            except Exception:
                pass

        if temp_paths:
            shutil.rmtree(os.path.dirname(temp_paths[0]), ignore_errors=True)
