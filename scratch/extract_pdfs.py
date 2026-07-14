"""
Step 1: Extract raw text from all Portuguese PDFs into .txt files in scratch/extracted/
"""
import fitz  # PyMuPDF
import os

DOCS_DIR = "public/documents"
OUT_DIR  = "scratch/extracted"
os.makedirs(OUT_DIR, exist_ok=True)

PDFS = [
    "RolexGrandSeiko_Analysis.pdf",
    "ROLEXVSGRANDSEIKO.pdf",
    "Koenigsegg_Content_Marketing.pdf",
    "AudemarsPiguet.pdf",
    "Saoloto_Campaign_Strategy.pdf",
    "SEO_Publication_Audit.pdf",
    "NeRF_Photogrammetry.pdf",
    "Internship_Final_Report.pdf",
    "Omega_Shopify_Presentation.pdf",
]

for filename in PDFS:
    path = os.path.join(DOCS_DIR, filename)
    if not os.path.exists(path):
        print(f"SKIP (not found): {filename}")
        continue

    doc = fitz.open(path)
    pages_text = []
    for i, page in enumerate(doc):
        text = page.get_text("text")
        pages_text.append(f"=== PAGE {i+1} ===\n{text}")
    doc.close()

    out_name = filename.replace(".pdf", ".txt")
    out_path = os.path.join(OUT_DIR, out_name)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(pages_text))

    print(f"Extracted {len(pages_text)} pages -> {out_name}")

print("\nDone! All text extracted to scratch/extracted/")
