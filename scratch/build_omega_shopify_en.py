"""
Build Omega_Shopify_Presentation_EN.pdf
Portuguese → English translation of the Omega Shopify Presentation.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus import KeepTogether

OUTPUT_PATH = (
    r"C:\Users\PC Multimedia\Desktop"
    r"\antigravity-portfolio-20260525T191450Z-3-001"
    r"\antigravity-portfolio\public\documents"
    r"\Omega_Shopify_Presentation_EN.pdf"
)

# ── Colour palette ──────────────────────────────────────────────────────────
OMEGA_DARK   = colors.HexColor("#1A1A2E")   # deep navy
OMEGA_ACCENT = colors.HexColor("#C9A96E")   # warm gold
OMEGA_LIGHT  = colors.HexColor("#F5F5F0")   # off-white
OMEGA_MID    = colors.HexColor("#4A4A6A")   # muted purple

W, H = A4
MARGIN = 18 * mm

# ── Styles ──────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

def make_style(name, parent="Normal", **kwargs):
    return ParagraphStyle(name, parent=styles[parent], **kwargs)

S_cover_title = make_style("CoverTitle",
    fontName="Helvetica-Bold", fontSize=36, textColor=OMEGA_ACCENT,
    alignment=TA_CENTER, spaceAfter=6)

S_cover_sub = make_style("CoverSub",
    fontName="Helvetica", fontSize=13, textColor=OMEGA_LIGHT,
    alignment=TA_CENTER, spaceAfter=4)

S_cover_label = make_style("CoverLabel",
    fontName="Helvetica-Bold", fontSize=10, textColor=OMEGA_ACCENT,
    alignment=TA_CENTER, spaceAfter=2)

S_cover_value = make_style("CoverValue",
    fontName="Helvetica", fontSize=10, textColor=OMEGA_LIGHT,
    alignment=TA_CENTER, spaceAfter=10)

S_section = make_style("SectionHead",
    fontName="Helvetica-Bold", fontSize=22, textColor=OMEGA_ACCENT,
    alignment=TA_CENTER, spaceAfter=14, spaceBefore=6)

S_h2 = make_style("H2",
    fontName="Helvetica-Bold", fontSize=14, textColor=OMEGA_DARK,
    spaceAfter=6, spaceBefore=10)

S_h3 = make_style("H3",
    fontName="Helvetica-Bold", fontSize=11, textColor=OMEGA_MID,
    spaceAfter=4, spaceBefore=6)

S_body = make_style("Body",
    fontName="Helvetica", fontSize=10, textColor=OMEGA_DARK,
    spaceAfter=4, leading=14)

S_bullet = make_style("Bullet",
    fontName="Helvetica", fontSize=10, textColor=OMEGA_DARK,
    leftIndent=14, spaceAfter=4, leading=14,
    bulletIndent=4, bulletFontName="Helvetica", bulletFontSize=10)

S_small = make_style("Small",
    fontName="Helvetica", fontSize=9, textColor=OMEGA_MID,
    spaceAfter=3, leading=12)

S_kpi_label = make_style("KpiLabel",
    fontName="Helvetica-Bold", fontSize=10, textColor=OMEGA_DARK,
    alignment=TA_LEFT)

S_kpi_value = make_style("KpiValue",
    fontName="Helvetica-Bold", fontSize=10, textColor=OMEGA_ACCENT,
    alignment=TA_CENTER)

S_question = make_style("Question",
    fontName="Helvetica-Bold", fontSize=10, textColor=OMEGA_DARK,
    spaceAfter=4, leading=14)

S_answer = make_style("Answer",
    fontName="Helvetica", fontSize=10, textColor=OMEGA_DARK,
    spaceAfter=6, leading=14)

# ── Page template with footer ───────────────────────────────────────────────
def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(OMEGA_MID)
    canvas.drawString(MARGIN, 10 * mm, "Omega Shopify E-Commerce Presentation  |  Metrics & Performance Evaluation")
    page_num = f"Page {doc.page}"
    canvas.drawRightString(W - MARGIN, 10 * mm, page_num)
    canvas.setStrokeColor(OMEGA_ACCENT)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, 13 * mm, W - MARGIN, 13 * mm)
    canvas.restoreState()

# ── Helper: dark-background cover block ─────────────────────────────────────
def cover_block(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(OMEGA_DARK)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # Gold top bar
    canvas.setFillColor(OMEGA_ACCENT)
    canvas.rect(0, H - 8 * mm, W, 8 * mm, fill=1, stroke=0)
    # Gold bottom bar
    canvas.rect(0, 0, W, 8 * mm, fill=1, stroke=0)
    # Page number
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(OMEGA_DARK)
    canvas.drawRightString(W - MARGIN, 2 * mm, f"Page {doc.page}")
    canvas.restoreState()

# ── Helper: standard page background ────────────────────────────────────────
def standard_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(OMEGA_LIGHT)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.setFillColor(OMEGA_DARK)
    canvas.rect(0, H - 6 * mm, W, 6 * mm, fill=1, stroke=0)
    add_footer(canvas, doc)
    canvas.restoreState()

# ── Build content ────────────────────────────────────────────────────────────
def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=22 * mm, bottomMargin=22 * mm,
    )

    story = []

    # ── PAGE 1: Cover ──────────────────────────────────────────────────────
    story.append(Spacer(1, 30 * mm))
    story.append(Paragraph("OMEGA", S_cover_title))
    story.append(Paragraph("Shopify E-Commerce Metrics Study", S_cover_sub))
    story.append(Spacer(1, 8 * mm))
    story.append(HRFlowable(width="60%", thickness=1, color=OMEGA_ACCENT, hAlign="CENTER"))
    story.append(Spacer(1, 12 * mm))

    story.append(Paragraph("Student:", S_cover_label))
    story.append(Paragraph("Pedro Cóias — a22400345", S_cover_value))

    story.append(Paragraph("Lecturer:", S_cover_label))
    story.append(Paragraph("Professor Carla Santos Rafael", S_cover_value))

    story.append(Paragraph("Course Unit:", S_cover_label))
    story.append(Paragraph("Metrics &amp; Performance Evaluation", S_cover_value))

    story.append(Spacer(1, 30 * mm))
    story.append(PageBreak())

    # ── PAGE 2: Omega – Business Overview ─────────────────────────────────
    story.append(Paragraph("OMEGA", S_section))
    story.append(HRFlowable(width="100%", thickness=1.5, color=OMEGA_ACCENT))
    story.append(Spacer(1, 6 * mm))

    items_p2 = [
        ("<b>Business:</b>",
         "Omega Estore (Vertically Integrated Brand – VIB)."),
        ("<b>Description:</b>",
         "Global D2C (Direct-to-Consumer) e-commerce operation on Shopify."),
        ("<b>Value Proposition:</b>",
         "Sale of \"Core\" models and accessories capturing 100% of the margin. "
         "Use of trusted technologies such as Augmented Reality (AR) and 3D for "
         "\"virtual try-on\" of watches, eliminating size and style uncertainty "
         "in remote purchases."),
        ("<b>Differentiation:</b>",
         "Exclusive Limited Edition inventory for physical boutiques (scarcity strategy), "
         "while the digital channel focuses on convenience and entry-level models."),
    ]

    for label, text in items_p2:
        story.append(Paragraph(label, S_h3))
        story.append(Paragraph(text, S_body))
        story.append(Spacer(1, 3 * mm))

    story.append(PageBreak())

    # ── PAGE 3: Monetisation Model ─────────────────────────────────────────
    story.append(Paragraph("MONETISATION MODEL", S_section))
    story.append(HRFlowable(width="100%", thickness=1.5, color=OMEGA_ACCENT))
    story.append(Spacer(1, 6 * mm))

    story.append(Paragraph("Revenue Streams", S_h2))

    streams = [
        ("Direct Product Sales",
         "Primary focus on Watches (e.g. Moonwatch), Bracelets, Jewellery, and Accessories."),
        ("After-Sales Services",
         "Revenue from maintenance sequences and repair services (\"Service Revenue\")."),
        ("Cross-sell &amp; Upsell",
         "Value-growth strategy through the sale of additional bracelets and complementary accessories."),
    ]
    for title, desc in streams:
        story.append(Paragraph(f"• <b>{title}:</b> {desc}", S_bullet))

    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph("Key KPIs Tracked", S_h2))

    kpis_p3 = [
        "Total Sales (Revenue – Total Amount Sold)",
        "Total Purchases (Orders – Number of Orders Placed)",
        "Products (Watches) Sold",
        "Product (Watch) Sales Revenue",
        "Services (Maintenance &amp; Repair) Sold",
        "Service Sales Revenue",
        "Products Sold with Complementary Items (Attach Rate)",
        "Insurance Policies Sold (Omega Care / Extended Warranty)",
        "Insurance Sales Revenue",
        "Credit Agreements (Financing) Processed",
        "Revenue from Credit-Financed Sales",
    ]
    for k in kpis_p3:
        story.append(Paragraph(f"• {k}", S_bullet))

    story.append(PageBreak())

    # ── PAGE 4: Annual Business Objectives – KPI Table ────────────────────
    story.append(Paragraph("ANNUAL BUSINESS OBJECTIVES", S_section))
    story.append(HRFlowable(width="100%", thickness=1.5, color=OMEGA_ACCENT))
    story.append(Spacer(1, 6 * mm))

    table_data = [
        ["KPI", "Baseline", "Target (OMEGA Goal)"],
        ["Total Sales", "€48,000,000", "€60,000,000 (+25%)"],
        ["Total Orders", "9,200 orders", "10,000 (+8.7%)"],
        ["Traffic (Sessions)", "920,000", "555,555 (−39.6%)\n(Greater efficiency)"],
        ["Conversion Rate", "1%", "1.8% (+0.8 p.p.)"],
        ["Average Order Value (AOV)", "€5,215", "€6,000 (+15.0%)"],
        ["CLTV (Lifetime Value)", "€6,500", "€8,500 (+30.8%)"],
        ["Retention Rate", "20%", "35% (+15 p.p.)"],
        ["Products per Order", "1.10", "1.25 (+13.6%)"],
    ]

    col_widths = [(W - 2 * MARGIN) * f for f in (0.40, 0.28, 0.32)]

    t = Table(table_data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND",   (0, 0), (-1, 0),  OMEGA_DARK),
        ("TEXTCOLOR",    (0, 0), (-1, 0),  OMEGA_ACCENT),
        ("FONTNAME",     (0, 0), (-1, 0),  "Helvetica-Bold"),
        ("FONTSIZE",     (0, 0), (-1, 0),  10),
        ("ALIGN",        (0, 0), (-1, 0),  "CENTER"),
        ("FONTNAME",     (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",     (0, 1), (-1, -1), 9),
        ("ALIGN",        (1, 1), (-1, -1), "CENTER"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EDEDEC")]),
        ("GRID",         (0, 0), (-1, -1), 0.5, colors.HexColor("#CCCCCC")),
        ("TOPPADDING",   (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 5),
        ("LEFTPADDING",  (0, 0), (-1, -1), 6),
    ]))
    story.append(t)
    story.append(PageBreak())

    # ── PAGE 5: Annual Performance Objectives Summary ─────────────────────
    story.append(Paragraph("ANNUAL PERFORMANCE OBJECTIVES", S_section))
    story.append(HRFlowable(width="100%", thickness=1.5, color=OMEGA_ACCENT))
    story.append(Spacer(1, 6 * mm))

    perf_data = [
        ["KPI (Indicator)", "Annual Objective (Omega)"],
        ["Traffic (Sessions)", "555,555"],
        ["Conversion Rate", "1.80%"],
        ["Average Order Value", "€6,000"],
        ["CLTV (Lifetime Value)", "€8,500"],
        ["No. of Customers", "8,500 Customers"],
    ]

    col_w5 = [(W - 2 * MARGIN) * f for f in (0.55, 0.45)]
    t5 = Table(perf_data, colWidths=col_w5, repeatRows=1)
    t5.setStyle(TableStyle([
        ("BACKGROUND",   (0, 0), (-1, 0),  OMEGA_DARK),
        ("TEXTCOLOR",    (0, 0), (-1, 0),  OMEGA_ACCENT),
        ("FONTNAME",     (0, 0), (-1, 0),  "Helvetica-Bold"),
        ("FONTSIZE",     (0, 0), (-1, 0),  10),
        ("ALIGN",        (0, 0), (-1, -1), "CENTER"),
        ("FONTNAME",     (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",     (0, 1), (-1, -1), 10),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EDEDEC")]),
        ("GRID",         (0, 0), (-1, -1), 0.5, colors.HexColor("#CCCCCC")),
        ("TOPPADDING",   (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 6),
    ]))
    story.append(t5)
    story.append(PageBreak())

    # ── PAGE 6: Strategies ────────────────────────────────────────────────
    story.append(Paragraph("STRATEGIES", S_section))
    story.append(HRFlowable(width="100%", thickness=1.5, color=OMEGA_ACCENT))
    story.append(Spacer(1, 6 * mm))

    strategies = [
        (
            "Traffic — Target: 555,555 sessions",
            [
                "<b>Paid Media:</b> Google Ads campaigns (Shopping &amp; Search) "
                "targeting high-intent terms (\"Omega Moonwatch\") and Meta Ads "
                "for visual brand awareness.",
                "<b>SEO Optimisation:</b> Structured content and product descriptions "
                "on Shopify to capture organic search traffic.",
            ]
        ),
        (
            "Conversion Rate — Target: 1.8%",
            [
                "<b>Augmented Reality (AR):</b> Implementation of 3D Virtual Try-On "
                "on product pages to reduce online purchase uncertainty.",
                "<b>Checkout Optimisation:</b> Use of Shopify Pay to streamline the "
                "purchasing process and reduce cart abandonment.",
            ]
        ),
        (
            "Average Order Value (AOV) — Target: €6,000",
            [
                "<b>In-Cart Cross-Selling:</b> Automatic suggestion of bracelets "
                "(NATO / Leather) and maintenance kits compatible with the selected watch.",
                "<b>Bundles &amp; Offers:</b> Curated bundles combining watches with "
                "complementary accessories at an attractive combined price.",
            ]
        ),
        (
            "CLTV (Lifetime Value) — Target: €8,500",
            [
                "<b>Email Marketing (CRM):</b> Automated post-purchase flows (care tips) "
                "and maintenance reminders (Service) triggered at 24 months.",
                "<b>Exclusive Access:</b> Early access to Limited Edition models "
                "(\"Snoopy\", \"Ed White\") rewarding loyal customers.",
            ]
        ),
        (
            "No. of Customers — Target: 8,500",
            [
                "<b>Loyalty &amp; Retention:</b> Focus on a premium unboxing experience "
                "to encourage social sharing (UGC) and word-of-mouth referrals.",
            ]
        ),
    ]

    for heading, bullets in strategies:
        story.append(Paragraph(heading, S_h2))
        for b in bullets:
            story.append(Paragraph(f"• {b}", S_bullet))
        story.append(Spacer(1, 4 * mm))

    story.append(PageBreak())

    # ── PAGE 7: Tools ─────────────────────────────────────────────────────
    story.append(Paragraph("TOOLS &amp; REPORTING", S_section))
    story.append(HRFlowable(width="100%", thickness=1.5, color=OMEGA_ACCENT))
    story.append(Spacer(1, 6 * mm))

    tools_data = [
        ["Tool", "Data Presentation", "Review Frequency"],
        ["Shopify (CMS &amp; Billing)", "Native Shopify Dashboard", "Daily"],
        ["Google Analytics 4", "GA4 Reports / Looker Studio", "Monthly"],
        ["Google Ads / Meta Ads", "Advertising Dashboards", "Weekly"],
        ["Microsoft Clarity", "Clarity Dashboard (Heatmaps)", "Monthly"],
        ["Google Tag Manager", "Debug View / Tags", "Quarterly"],
    ]

    col_w7 = [(W - 2 * MARGIN) * f for f in (0.38, 0.38, 0.24)]
    t7 = Table(tools_data, colWidths=col_w7, repeatRows=1)
    t7.setStyle(TableStyle([
        ("BACKGROUND",   (0, 0), (-1, 0),  OMEGA_DARK),
        ("TEXTCOLOR",    (0, 0), (-1, 0),  OMEGA_ACCENT),
        ("FONTNAME",     (0, 0), (-1, 0),  "Helvetica-Bold"),
        ("FONTSIZE",     (0, 0), (-1, 0),  10),
        ("ALIGN",        (0, 0), (-1, -1), "CENTER"),
        ("FONTNAME",     (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",     (0, 1), (-1, -1), 9),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EDEDEC")]),
        ("GRID",         (0, 0), (-1, -1), 0.5, colors.HexColor("#CCCCCC")),
        ("TOPPADDING",   (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 6),
    ]))
    story.append(t7)
    story.append(PageBreak())

    # ── PAGE 8: Strategic Reflection – Conversion Rate ────────────────────
    story.append(Paragraph("STRATEGIC REFLECTION — CONVERSION RATE", S_section))
    story.append(HRFlowable(width="100%", thickness=1.5, color=OMEGA_ACCENT))
    story.append(Spacer(1, 6 * mm))

    qa8 = [
        (
            "What is the Conversion Rate?",
            "The percentage of website visitors who complete the ultimate goal (in this case, a purchase). "
            "It measures how effectively the site turns \"browsers\" into buyers."
        ),
        (
            "Where to view it and how to calculate it?",
            "<b>Where to view:</b> Shopify Dashboard (\"Online Store Conversion Rate\") and Google Analytics 4 "
            "(1. Reports → 2. Monetization → 3. User Purchase Journey — this report presents the sales funnel "
            "step-by-step, showing how many users started a session and how many actually progressed to the "
            "final Purchase stage, enabling identification of the biggest drop-off points).<br/><br/>"
            "<b>Formula:</b> (Total Orders ÷ Total Sessions) × 100"
        ),
        (
            "How to improve it? (if below expectations)",
            None
        ),
    ]

    for q, a in qa8:
        story.append(Paragraph(q, S_question))
        if a:
            story.append(Paragraph(a, S_answer))
        story.append(Spacer(1, 2 * mm))

    improvements8 = [
        "<b>1. Visual Trust (AR):</b> Enhance the 3D Virtual Try-On experience to dispel "
        "the \"how will it look on my wrist?\" doubt.",
        "<b>2. Page Speed:</b> Optimise high-resolution image loading (WebP format) "
        "to prevent visitors from abandoning slow pages.",
        "<b>3. Checkout Friction:</b> Implement Shop Pay and Apple Pay for one-click "
        "purchases, and offer instalment options (Klarna / Splitit).",
    ]
    for imp in improvements8:
        story.append(Paragraph(f"• {imp}", S_bullet))

    story.append(PageBreak())

    # ── PAGE 9: Strategic Reflection – AOV ────────────────────────────────
    story.append(Paragraph("STRATEGIC REFLECTION — AVERAGE ORDER VALUE (AOV)", S_section))
    story.append(HRFlowable(width="100%", thickness=1.5, color=OMEGA_ACCENT))
    story.append(Spacer(1, 6 * mm))

    qa9 = [
        (
            "What is the Average Order Value (AOV)?",
            "The average monetary value spent by each customer in a single transaction. "
            "It indicates whether customers are purchasing only the basics or adding extras."
        ),
        (
            "Where to view it and how to calculate it?",
            "<b>Where to view:</b> Shopify Sales Reports. Google Analytics 4 "
            "(1. Reports → 2. Monetization → 3. Overview → 4. Calculation: Total Revenue ÷ Total Purchases)."
        ),
        (
            "How to improve it? (if below expectations)",
            None
        ),
    ]

    for q, a in qa9:
        story.append(Paragraph(q, S_question))
        if a:
            story.append(Paragraph(a, S_answer))
        story.append(Spacer(1, 2 * mm))

    improvements9 = [
        "<b>1. Smart Cross-Selling:</b> Suggest compatible bracelets (NATO, Leather) "
        "in the \"side cart\" before payment.",
        "<b>2. Bundles:</b> Create \"Watch + Travel Case\" kits at a price advantage "
        "over purchasing items separately.",
        "<b>3. Premium Services:</b> Offer \"Warranty Extension\" or \"Personal Engraving\" "
        "as a paid add-on at checkout.",
    ]
    for imp in improvements9:
        story.append(Paragraph(f"• {imp}", S_bullet))

    story.append(PageBreak())

    # ── PAGE 10: Strategic Reflection – CLTV ──────────────────────────────
    story.append(Paragraph("STRATEGIC REFLECTION — CLIENT LIFETIME VALUE (CLTV)", S_section))
    story.append(HRFlowable(width="100%", thickness=1.5, color=OMEGA_ACCENT))
    story.append(Spacer(1, 6 * mm))

    qa10 = [
        (
            "What is CLTV?",
            "The total profit or revenue a customer is expected to generate for the brand "
            "throughout the entire relationship — not just on the first purchase."
        ),
        (
            "Where to view it and how to calculate it?",
            "<b>Where to view:</b> Shopify Customer Data Export (Cohort Analysis) or calculated "
            "in Excel / Looker Studio. Google Analytics 4 (1. Explore → 2. Template Gallery → "
            "3. User Lifetime — this exploration tool creates a specific report that calculates "
            "the cumulative monetary value of users (LTV) from their first acquisition to the "
            "current date).<br/><br/>"
            "<b>Simplified Formula:</b> Average Order Value (AOV) × Annual Purchase Frequency "
            "× Customer Lifespan"
        ),
        (
            "How to improve it? (if below expectations)",
            None
        ),
    ]

    for q, a in qa10:
        story.append(Paragraph(q, S_question))
        if a:
            story.append(Paragraph(a, S_answer))
        story.append(Spacer(1, 2 * mm))

    improvements10 = [
        "<b>1. Service Cycle:</b> Email automation (Klaviyo) triggered at 24–36 months "
        "reminding customers of the need for an official service (Paid Service).",
        "<b>2. Exclusive Access:</b> Priority purchasing rights for Limited Edition models "
        "(\"Snoopy\", \"Ed White\") for returning customers, driving loyalty.",
        "<b>3. Community:</b> Invitations to digital Metaverse events or in-person "
        "Boutique events, keeping the brand top-of-mind.",
    ]
    for imp in improvements10:
        story.append(Paragraph(f"• {imp}", S_bullet))

    story.append(PageBreak())

    # ── PAGE 11: Thank You / Closing ──────────────────────────────────────
    story.append(Spacer(1, 30 * mm))
    story.append(Paragraph("THANK YOU", S_cover_title))
    story.append(Spacer(1, 6 * mm))
    story.append(HRFlowable(width="60%", thickness=1, color=OMEGA_ACCENT, hAlign="CENTER"))
    story.append(Spacer(1, 12 * mm))

    story.append(Paragraph("Student:", S_cover_label))
    story.append(Paragraph("Pedro Cóias — a22400345", S_cover_value))
    story.append(Paragraph("Lecturer:", S_cover_label))
    story.append(Paragraph("Professor Carla Santos Rafael", S_cover_value))
    story.append(Paragraph("Course Unit:", S_cover_label))
    story.append(Paragraph("Metrics &amp; Performance Evaluation", S_cover_value))

    # ── Build ─────────────────────────────────────────────────────────────
    # First page uses the dark cover template; the rest use standard_page
    doc.build(
        story,
        onFirstPage=cover_block,
        onLaterPages=standard_page,
    )
    print(f"PDF written to: {OUTPUT_PATH}")


if __name__ == "__main__":
    build_pdf()
