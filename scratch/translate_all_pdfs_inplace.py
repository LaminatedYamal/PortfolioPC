import fitz  # PyMuPDF
import os
import time
from deep_translator import GoogleTranslator

DOCS_DIR = "public/documents"
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

translator = GoogleTranslator(source='pt', target='en')

def get_bg_color(page, bbox):
    try:
        pix = page.get_pixmap()
        # Sample background color slightly outside the top-left to avoid sampling the text color itself
        x = max(0, min(int(bbox[0] - 2), pix.width - 1))
        y = max(0, min(int(bbox[1] - 2), pix.height - 1))
        color = pix.pixel(x, y)
        return (color[0]/255.0, color[1]/255.0, color[2]/255.0)
    except:
        return (1.0, 1.0, 1.0)

def translate_pdf_inplace(filename):
    src_path = os.path.join(DOCS_DIR, filename)
    dst_name = filename.replace(".pdf", "_EN.pdf")
    dst_path = os.path.join(DOCS_DIR, dst_name)
    
    print(f"\n==========================================")
    print(f"TRANSLATING IN-PLACE: {filename} -> {dst_name}")
    print(f"==========================================")
    
    if not os.path.exists(src_path):
        print(f"Error: {src_path} does not exist!")
        return

    doc = fitz.open(src_path)
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        print(f"Page {page_num + 1}/{len(doc)}...")
        
        text_dict = page.get_text("dict")
        
        for block in text_dict["blocks"]:
            if "lines" not in block:
                continue
                
            block_lines = []
            for line in block["lines"]:
                line_text = "".join(span["text"] for span in line["spans"])
                block_lines.append(line_text)
                
            full_text = " ".join(block_lines).strip()
            if not full_text or len(full_text) < 2 or full_text.isdigit():
                continue
                
            # Translate the block text with retry logic
            translated = None
            for attempt in range(3):
                try:
                    translated = translator.translate(full_text)
                    time.sleep(0.25) # safety delay
                    break
                except Exception as e:
                    print(f"  Translation error on '{full_text[:20]}...' (attempt {attempt+1}): {e}")
                    time.sleep(2 ** attempt)
            
            if not translated:
                translated = full_text
                
            bbox = block["bbox"]
            bg_color = get_bg_color(page, bbox)
            
            # Draw background color mask over original text
            page.draw_rect(bbox, color=bg_color, fill=bg_color, width=0)
            
            # Draw translated text
            first_span = block["lines"][0]["spans"][0]
            font_size = first_span["size"]
            font_name = first_span["font"]
            color_int = first_span["color"]
            
            # Hex color conversion
            r = ((color_int >> 16) & 0xff) / 255.0
            g = ((color_int >> 8) & 0xff) / 255.0
            b = (color_int & 0xff) / 255.0
            text_color = (r, g, b)
            
            # Map font
            font_lower = font_name.lower()
            if "bold" in font_lower:
                pdf_font = "hebo"
            elif "italic" in font_lower:
                pdf_font = "hebi"
            else:
                pdf_font = "helv"
                
            # Align text
            # standard alignment: 0=left, 1=center, 2=right
            align_val = 0
            
            page.insert_textbox(
                bbox, 
                translated, 
                fontsize=font_size * 0.95, 
                fontname=pdf_font, 
                color=text_color, 
                align=align_val
            )
            
    doc.save(dst_path)
    doc.close()
    print(f"Finished generating: {dst_name}")

if __name__ == "__main__":
    start_time = time.time()
    for filename in PDF_FILES:
        try:
            translate_pdf_inplace(filename)
        except Exception as e:
            print(f"Failed to translate {filename} in-place: {e}")
    print(f"\nAll in-place translations finished in {time.time() - start_time:.2f} seconds!")
