import fitz # PyMuPDF
import os

input_path = r"public/documents/Koenigsegg_Trab_Total.pdf"
output_path = r"public/documents/Koenigsegg_Trab_Total_compressed.pdf"

doc = fitz.open(input_path)
print(f"Original size: {os.path.getsize(input_path) / (1024*1024):.2f} MB")

# Save with garbage collection, deflation, and image optimization
doc.save(output_path, garbage=4, deflate=True, deflate_images=True, deflate_fonts=True)
print(f"Compressed size: {os.path.getsize(output_path) / (1024*1024):.2f} MB")

# If deflate isn't enough, we re-encode high-res images inside PDF
if os.path.getsize(output_path) > 90 * 1024 * 1024:
    print("Re-compressing images to ensure <50MB...")
    new_doc = fitz.open()
    for page in doc:
        # Render page at 150 DPI
        pix = page.get_pixmap(dpi=120)
        img_pdf = fitz.open("pdf", pix.pdfocr_tobytes() if hasattr(pix, 'pdfocr_tobytes') else pix.tobytes("pdf"))
        new_doc.insert_pdf(img_pdf)
    new_doc.save(output_path, garbage=4, deflate=True)
    print(f"Final size: {os.path.getsize(output_path) / (1024*1024):.2f} MB")

doc.close()
