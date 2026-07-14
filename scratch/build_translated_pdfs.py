import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

SRC_DIR = "scratch/translated"
DST_DIR = "public/documents"

os.makedirs(DST_DIR, exist_ok=True)

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#4f46e5")) # Indigo accent
        
        # Header (Top of page)
        self.drawString(54, 755, "PEDRO CÓIAS — PORTFOLIO PROJECT")
        self.setFont("Helvetica-Oblique", 8)
        self.setFillColor(colors.HexColor("#6b7280"))
        self.drawRightString(558, 755, "English Translation")
        
        self.setStrokeColor(colors.HexColor("#e5e7eb"))
        self.setLineWidth(0.5)
        self.line(54, 747, 558, 747)
        
        # Footer
        self.line(54, 52, 558, 52)
        self.setFont("Helvetica", 8)
        self.drawString(54, 40, "Academic & Professional Digital Marketing Portfolio")
        
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 40, page_text)
        self.restoreState()

def build_pdf(txt_filename):
    txt_path = os.path.join(SRC_DIR, txt_filename)
    # Output name has _EN.pdf
    pdf_filename = txt_filename.replace(".txt", "_EN.pdf")
    pdf_path = os.path.join(DST_DIR, pdf_filename)
    
    print(f"Building PDF for {txt_filename} -> {pdf_filename}...")
    
    with open(txt_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    parts = content.split("=== PAGE ")
    story = []
    
    # Setup document styles
    styles = getSampleStyleSheet()
    
    # Define custom styles
    title_style = ParagraphStyle(
        name='DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#1e1b4b"), # Very dark blue
        spaceAfter=15,
        alignment=1 # Center
    )
    
    heading_style = ParagraphStyle(
        name='ProjectHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#1e3a8a"), # Dark blue
        spaceAfter=6,
        spaceBefore=10
    )
    
    body_style = ParagraphStyle(
        name='ProjectBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor("#1f2937"), # Dark gray
        spaceAfter=5
    )
    
    bullet_style = ParagraphStyle(
        name='ProjectBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        leftIndent=15,
        firstLineIndent=-10,
        textColor=colors.HexColor("#1f2937"),
        spaceAfter=4
    )
    
    list_style = ParagraphStyle(
        name='ProjectList',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        leftIndent=15,
        firstLineIndent=-10,
        textColor=colors.HexColor("#1f2937"),
        spaceAfter=4
    )
    
    # Document title block on page 1
    doc_title = txt_filename.replace(".txt", "").replace("_", " ")
    story.append(Spacer(1, 20))
    story.append(Paragraph(doc_title.upper(), title_style))
    story.append(Spacer(1, 10))
    
    is_first_page = True
    
    for part in parts:
        if not part.strip():
            continue
            
        # Parse page contents
        lines = part.split("\n", 1)
        page_num_str = lines[0].split(" ===")[0].strip()
        page_text = lines[1] if len(lines) > 1 else ""
        
        if not is_first_page:
            story.append(PageBreak())
        else:
            is_first_page = False
            
        # Parse lines of the page into story
        page_lines = page_text.split("\n")
        for line in page_lines:
            line = line.strip()
            if not line:
                story.append(Spacer(1, 6))
                continue
                
            # Formatting checks
            if line.isupper() and len(line) < 70:
                story.append(Paragraph(line, heading_style))
            elif line.startswith(("-", "*", "•")):
                clean_text = line[1:].strip()
                story.append(Paragraph(f"&bull; {clean_text}", bullet_style))
            elif line[0].isdigit() and (line.startswith(tuple(f"{i}." for i in range(10))) or line.startswith(tuple(f"{i})" for i in range(10)))):
                story.append(Paragraph(line, list_style))
            else:
                story.append(Paragraph(line, body_style))
                
    # Build Document
    # Printable area: width=612, height=792. Margins 54pt.
    # Top margin is 72pt (to leave space for header line at 747), bottom margin is 72pt.
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=72,
        bottomMargin=72
    )
    
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {pdf_filename}")

if __name__ == "__main__":
    txt_files = [f for f in os.listdir(SRC_DIR) if f.endswith(".txt")]
    for filename in txt_files:
        try:
            build_pdf(filename)
        except Exception as e:
            print(f"Error building PDF for {filename}: {e}")
            
    print("\nPDF generation finished!")
