import os
import json
import time
from deep_translator import GoogleTranslator

SRC_DIR = "scratch/extracted"
DST_DIR = "scratch/translated"
CACHE_FILE = "scratch/translation_cache.json"

os.makedirs(DST_DIR, exist_ok=True)

# Load cache if it exists
if os.path.exists(CACHE_FILE):
    with open(CACHE_FILE, "r", encoding="utf-8") as f:
        cache = json.load(f)
else:
    cache = {}

FILES = [
    "RolexGrandSeiko_Analysis.txt",
    "ROLEXVSGRANDSEIKO.txt",
    "Koenigsegg_Content_Marketing.txt",
    "AudemarsPiguet.pdf", # Note: earlier it extracted to AudemarsPiguet.txt or AudemarsPiguet.pdf.txt? Let's check.
    "Saoloto_Campaign_Strategy.txt",
    "SEO_Publication_Audit.txt",
    "NeRF_Photogrammetry.txt",
    "Internship_Final_Report.txt",
    "Omega_Shopify_Presentation.txt"
]

# Let's list files actually present in scratch/extracted/
actual_files = [f for f in os.listdir(SRC_DIR) if f.endswith(".txt")]
print("Files to translate:", actual_files)

translator = GoogleTranslator(source='pt', target='en')

def translate_text(text):
    if not text.strip():
        return ""
    # Google Translate limit is 5000 chars. If chunk is too large, split it.
    if len(text) < 4500:
        return translator.translate(text)
    else:
        # Split by paragraph
        paragraphs = text.split("\n")
        translated_paragraphs = []
        current_chunk = []
        current_len = 0
        for p in paragraphs:
            if current_len + len(p) + 1 > 4000:
                chunk_text = "\n".join(current_chunk)
                translated_paragraphs.append(translator.translate(chunk_text))
                current_chunk = [p]
                current_len = len(p)
            else:
                current_chunk.append(p)
                current_len += len(p) + 1
        if current_chunk:
            chunk_text = "\n".join(current_chunk)
            translated_paragraphs.append(translator.translate(chunk_text))
        return "\n".join(translated_paragraphs)

for filename in actual_files:
    src_path = os.path.join(SRC_DIR, filename)
    dst_path = os.path.join(DST_DIR, filename)
    
    print(f"\nProcessing {filename}...")
    
    with open(src_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Split by page
    parts = content.split("=== PAGE ")
    translated_parts = []
    
    # The first part might be empty or preamble
    if parts[0].strip():
        translated_parts.append(translate_text(parts[0]))
        
    for part in parts[1:]:
        # Part looks like: "1 ===\nPage content..."
        lines = part.split("\n", 1)
        page_num_str = lines[0].split(" ===")[0].strip()
        page_text = lines[1] if len(lines) > 1 else ""
        
        cache_key = f"{filename}_page_{page_num_str}"
        if cache_key in cache:
            translated_text = cache[cache_key]
            print(f"  Page {page_num_str} (Cached)")
        else:
            print(f"  Translating Page {page_num_str}...")
            try:
                translated_text = translate_text(page_text)
                cache[cache_key] = translated_text
                # Save cache after each page to prevent losing progress
                with open(CACHE_FILE, "w", encoding="utf-8") as cf:
                    json.dump(cache, cf, ensure_ascii=False, indent=2)
                time.sleep(0.5) # rate limit safety
            except Exception as e:
                print(f"    Error translating page {page_num_str}: {e}")
                translated_text = page_text # fallback to original on error
                
        translated_parts.append(f"=== PAGE {page_num_str} ===\n{translated_text}")
        
    with open(dst_path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(translated_parts))
    print(f"Saved translated text to {dst_path}")

print("\nTranslation complete!")
