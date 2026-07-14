import os
import json

SRC_PT_DIR = "scratch/extracted"
SRC_EN_DIR = "scratch/translated"
DST_DIR = "public/documents"

os.makedirs(DST_DIR, exist_ok=True)

DOC_TYPES = {
    "RolexGrandSeiko_Analysis": "report",
    "ROLEXVSGRANDSEIKO": "presentation",
    "Koenigsegg_Content_Marketing": "presentation",
    "AudemarsPiguet": "presentation",
    "Saoloto_Campaign_Strategy": "report",
    "SEO_Publication_Audit": "report",
    "NeRF_Photogrammetry": "report",
    "Internship_Final_Report": "report",
    "Omega_Shopify_Presentation": "presentation"
}

def parse_txt_file(file_path):
    if not os.path.exists(file_path):
        return None
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    parts = content.split("=== PAGE ")
    pages = []
    
    for part in parts:
        if not part.strip():
            continue
            
        lines = part.split("\n")
        header = lines[0].strip()
        page_num = header.split(" ===")[0].strip()
        
        page_lines = []
        for line in lines[1:]:
            line_str = line.strip()
            if line_str:
                page_lines.append(line_str)
                
        # Try to find a heading for the slide/page
        title = ""
        content_lines = page_lines
        if page_lines:
            # If the first line is short and uppercase, treat it as slide title
            if page_lines[0].isupper() and len(page_lines[0]) < 60:
                title = page_lines[0]
                content_lines = page_lines[1:]
                
        pages.append({
            "pageNumber": int(page_num) if page_num.isdigit() else len(pages) + 1,
            "title": title,
            "content": content_lines
        })
        
    return pages

def convert_to_json(base_name):
    doc_type = DOC_TYPES.get(base_name, "report")
    
    # Process Portuguese
    pt_txt = os.path.join(SRC_PT_DIR, base_name + ".txt")
    pt_pages = parse_txt_file(pt_txt)
    if pt_pages:
        pt_data = {
            "title": base_name.replace("_", " "),
            "documentType": doc_type,
            "pages": pt_pages
        }
        pt_json_path = os.path.join(DST_DIR, base_name + ".json")
        with open(pt_json_path, "w", encoding="utf-8") as f:
            json.dump(pt_data, f, ensure_ascii=False, indent=2)
        print(f"Generated PT JSON: {pt_json_path}")
        
    # Process English
    en_txt = os.path.join(SRC_EN_DIR, base_name + ".txt")
    en_pages = parse_txt_file(en_txt)
    if en_pages:
        en_data = {
            "title": base_name.replace("_", " "),
            "documentType": doc_type,
            "pages": en_pages
        }
        en_json_path = os.path.join(DST_DIR, base_name + "_EN.json")
        with open(en_json_path, "w", encoding="utf-8") as f:
            json.dump(en_data, f, ensure_ascii=False, indent=2)
        print(f"Generated EN JSON: {en_json_path}")

if __name__ == "__main__":
    for base_name in DOC_TYPES.keys():
        convert_to_json(base_name)
    print("\nAll conversions completed!")
