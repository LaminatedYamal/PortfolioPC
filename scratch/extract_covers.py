import fitz  # PyMuPDF
import os

DOCS_DIR = "public/documents"
OUT_DIR = "public/images/covers"
os.makedirs(OUT_DIR, exist_ok=True)

PDF_FILES = [
    "RolexGrandSeiko_Analysis.pdf",
    "ROLEXVSGRANDSEIKO.pdf",
    "Koenigsegg_Content_Marketing.pdf",
    "AudemarsPiguet.pdf",
    "Saoloto_Campaign_Strategy.pdf",
    "SEO_Publication_Audit.pdf",
    "NeRF_Photogrammetry.pdf",
    "Internship_Final_Report.pdf",
    "Omega_Shopify_Presentation.pdf"
]

for filename in PDF_FILES:
    src_path = os.path.join(DOCS_DIR, filename)
    if not os.path.exists(src_path):
        print(f"Skipping (not found): {filename}")
        continue
        
    out_name = filename.replace(".pdf", ".png")
    out_path = os.path.join(OUT_DIR, out_name)
    
    print(f"Extracting first page of {filename}...")
    try:
        doc = fitz.open(src_path)
        page = doc[0] # page 0
        
        # Render at 150 DPI for clean sharp visuals
        pix = page.get_pixmap(dpi=150)
        pix.save(out_path)
        doc.close()
        print(f"  Saved cover to {out_path}")
    except Exception as e:
        print(f"  Error extracting cover for {filename}: {e}")

print("\nAll cover extraction completed!")
