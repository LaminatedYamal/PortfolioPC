import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

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
        # Draw header and footer
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#A0AEC0"))
        
        # Header (Only draw on page 2 and later)
        if self._pageNumber > 1:
            self.drawString(54, 750, "Pedro Coias Portfolio Setup Guide")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)
            
        # Footer
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(54, 55, 558, 55)
        
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 42, page_text)
        self.drawString(54, 42, "Confidential - Personal Tinkering Guide")
        self.restoreState()

def build_pdf():
    pdf_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "Portfolio_Setup_Instructions.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=72,
        bottomMargin=72
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    primary_color = colors.HexColor("#0077B6") # Royal/Cyan accent
    secondary_color = colors.HexColor("#00B4D8")
    dark_neutral = colors.HexColor("#1A202C")
    light_neutral = colors.HexColor("#F7FAFC")
    border_color = colors.HexColor("#E2E8F0")

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=primary_color,
        spaceBefore=18,
        spaceAfter=8,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=dark_neutral,
        spaceAfter=8
    )

    code_style = ParagraphStyle(
        'CodeBlock',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#2D3748"),
        spaceAfter=8
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white
    )

    table_body_style = ParagraphStyle(
        'TableBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=dark_neutral
    )

    story = []

    # Title Section
    story.append(Paragraph("Pedro Henrique Martins Coias", ParagraphStyle('Sub', fontName='Helvetica-Bold', fontSize=10, leading=12, textColor=secondary_color, spaceAfter=4)))
    story.append(Paragraph("Personal Portfolio Setup & Setup Guide", title_style))
    story.append(Spacer(1, 10))

    # Introduction
    story.append(Paragraph(
        "This document provides the necessary instructions to clone, configure, and locally run your Next.js "
        "portfolio codebase and Sanity CMS Studio. Follow these instructions on your home computer to continue tinkering.",
        body_style
    ))
    story.append(Spacer(1, 10))

    # Location Information
    story.append(Paragraph("Project Details & Locations", h1_style))
    
    info_data = [
        [Paragraph("<b>Current Folder</b>", table_body_style), Paragraph("C:\\Users\\audem\\Desktop\\Antigravity\\antigravity-portfolio", table_body_style)],
        [Paragraph("<b>GitHub Repo URL</b>", table_body_style), Paragraph("https://github.com/LaminatedYamal/PortfolioPC", table_body_style)],
        [Paragraph("<b>Sanity Project ID</b>", table_body_style), Paragraph("dkwgoenb", table_body_style)],
        [Paragraph("<b>Dataset</b>", table_body_style), Paragraph("production", table_body_style)]
    ]
    t_info = Table(info_data, colWidths=[150, 350])
    t_info.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), light_neutral),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_info)
    story.append(Spacer(1, 15))

    # Step-by-Step Guide
    story.append(Paragraph("How to Setup on a Home Computer", h1_style))
    
    steps = [
        "<b>Step 1: Install Git & Node.js</b><br/>Make sure your home computer has Git and Node.js (version 18+ or 20+ recommended) installed.",
        "<b>Step 2: Clone the Codebase</b><br/>Open your Command Prompt or PowerShell, and run:<br/>"
        "<i>git clone https://github.com/LaminatedYamal/PortfolioPC.git</i>",
        "<b>Step 3: Install Dependencies</b><br/>Go into the project folder and install modules:<br/>"
        "<i>cd PortfolioPC</i><br/>"
        "<i>npm install</i>",
        "<b>Step 4: Configure Local Credentials</b><br/>Create a file in the project folder named <b>.env.local</b> and add:<br/>"
        "<code>NEXT_PUBLIC_SANITY_PROJECT_ID=dkwgoenb<br/>"
        "NEXT_PUBLIC_SANITY_DATASET=production<br/>"
        "NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01</code>",
        "<b>Step 5: Start Development Server</b><br/>Run the dev script to view your website and studio:<br/>"
        "<i>npm run dev</i>"
    ]

    for step in steps:
        story.append(Paragraph(step, body_style))
        story.append(Spacer(1, 5))

    story.append(PageBreak())

    # Studio Access & Mappings
    story.append(Paragraph("Sanity Studio Access & Custom Icons", h1_style))
    story.append(Paragraph(
        "Sanity Studio is embedded directly into your Next.js project. You can access it locally while the development server is running, or host it.",
        body_style
    ))
    
    studio_data = [
        [Paragraph("<b>Local Studio Link</b>", table_body_style), Paragraph("http://localhost:3000/PortfolioPC/studio", table_body_style)],
        [Paragraph("<b>Sanity Cloud Hosted Link</b>", table_body_style), Paragraph("https://dkwgoenb.sanity.studio", table_body_style)]
    ]
    t_studio = Table(studio_data, colWidths=[150, 350])
    t_studio.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), light_neutral),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_studio)
    story.append(Spacer(1, 15))

    story.append(Paragraph("Custom Tool Stack Icon Reference", ParagraphStyle('Sub2', parent=h1_style, fontSize=12, leading=14)))
    story.append(Paragraph(
        "When adding tools to a project's Tool Stack in Sanity, writing the following names exactly (case-insensitive) "
        "will automatically show their custom color brand icons on the portfolio page details modal:",
        body_style
    ))

    # Icon Reference Table
    icon_rows = [
        [Paragraph("Tool Stack Name", table_header_style), Paragraph("Icon Used", table_header_style), Paragraph("Visual Color / Style", table_header_style)],
        [Paragraph("Google Ads / Gads", table_body_style), Paragraph("SiGoogleads", table_body_style), Paragraph("Google Ads Yellow (#FBBC05)", table_body_style)],
        [Paragraph("Meta Business / Metabusinesssuite", table_body_style), Paragraph("SiMeta", table_body_style), Paragraph("Meta Blue (#0668E1)", table_body_style)],
        [Paragraph("Antigravity", table_body_style), Paragraph("FaRocket", table_body_style), Paragraph("Pulsing Cyan Rocket Ship 🚀", table_body_style)],
        [Paragraph("LM Studio", table_body_style), Paragraph("FaRobot", table_body_style), Paragraph("Purple AI Robot (#8A2BE2) 🤖", table_body_style)],
        [Paragraph("GitHub", table_body_style), Paragraph("SiGithub", table_body_style), Paragraph("White Icon", table_body_style)],
        [Paragraph("Sketchfab", table_body_style), Paragraph("SiSketchfab", table_body_style), Paragraph("Sketchfab Blue (#1CAAD9)", table_body_style)],
        [Paragraph("Google Sheets / Sheets", table_body_style), Paragraph("SiGooglesheets", table_body_style), Paragraph("Sheets Green (#0F9D58)", table_body_style)],
        [Paragraph("Google Docs / Docs", table_body_style), Paragraph("SiGoogledocs", table_body_style), Paragraph("Docs Blue (#4285F4)", table_body_style)],
        [Paragraph("CapCut", table_body_style), Paragraph("FaFilm", table_body_style), Paragraph("Teal Filmstrip (#25F4EE)", table_body_style)],
        [Paragraph("Clipchamp", table_body_style), Paragraph("FaVideo", table_body_style), Paragraph("Clipchamp Purple (#5B2D91)", table_body_style)],
        [Paragraph("Canva", table_body_style), Paragraph("SiCanva", table_body_style), Paragraph("Canva Teal (#00C4CC)", table_body_style)]
    ]
    t_icons = Table(icon_rows, colWidths=[170, 150, 180])
    t_icons.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, light_neutral]),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_icons)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF generated successfully at: {pdf_path}")

if __name__ == "__main__":
    build_pdf()
