import fitz  # PyMuPDF
import os
import time
from deep_translator import GoogleTranslator

# Input and output paths
src_pdf = "public/documents/Omega_Shopify_Presentation.pdf"
dst_pdf = "public/documents/Omega_Shopify_Presentation_EN.pdf"

print(f"Opening {src_pdf}...")
doc = fitz.open(src_pdf)
translator = GoogleTranslator(source='pt', target='en')

def get_bg_color(page, bbox):
    try:
        # Sample background color from top-left of the bounding box
        pix = page.get_pixmap()
        x = max(0, min(int(bbox[0]), pix.width - 1))
        y = max(0, min(int(bbox[1]), pix.height - 1))
        color = pix.pixel(x, y) # (r, g, b)
        return (color[0]/255.0, color[1]/255.0, color[2]/255.0)
    except Exception as e:
        print(f"Error sampling color: {e}")
        return (1.0, 1.0, 1.0)

for page_num in range(len(doc)):
    page = doc[page_num]
    print(f"Processing Page {page_num + 1}...")
    
    # Get text blocks
    text_dict = page.get_text("dict")
    
    for block in text_dict["blocks"]:
        if "lines" not in block:
            continue
            
        # Extract text from block
        block_lines = []
        for line in block["lines"]:
            line_text = "".join(span["text"] for span in line["spans"])
            block_lines.append(line_text)
            
        full_text = " ".join(block_lines).strip()
        if not full_text:
            continue
            
        # Ignore purely numeric or symbol blocks (e.g. page numbers or single dots)
        if len(full_text) < 2 or full_text.isdigit():
            continue
            
        print(f"  Original: {full_text[:40]}...")
        
        try:
            # Translate text
            translated = translator.translate(full_text)
            print(f"  Translated: {translated[:40]}...")
            time.sleep(0.2)
        except Exception as e:
            print(f"  Translation error: {e}")
            translated = full_text
            
        # Bounding box of the block
        bbox = block["bbox"]
        
        # Sample background color
        bg_color = get_bg_color(page, bbox)
        
        # Cover old text with background color
        # Use border=None to prevent drawing an outline
        page.draw_rect(bbox, color=bg_color, fill=bg_color, width=0)
        
        # Draw new text
        # Get first span font details
        first_span = block["lines"][0]["spans"][0]
        font_size = first_span["size"]
        font_name = first_span["font"]
        color_int = first_span["color"]
        
        # Convert integer color (sRGB) to float tuple
        r = ((color_int >> 16) & 0xff) / 255.0
        g = ((color_int >> 8) & 0xff) / 255.0
        b = (color_int & 0xff) / 255.0
        text_color = (r, g, b)
        
        # Map original font names to standard PDF fonts to prevent missing font errors
        # standard fonts: helv, hebo, hebi, helveticabold, etc.
        font_lower = font_name.lower()
        if "bold" in font_lower:
            pdf_font = "hebo"
        elif "italic" in font_lower:
            pdf_font = "hebi"
        else:
            pdf_font = "helv"
            
        # Insert textbox
        page.insert_textbox(
            bbox, 
            translated, 
            fontsize=font_size * 0.95, # slightly smaller to ensure it fits the box
            fontname=pdf_font, 
            color=text_color, 
            align=0 # left-align
        )

doc.save(dst_pdf)
doc.close()
print(f"Saved translated PDF to {dst_pdf}")
