from weasyprint import HTML
import io

def html_to_pdf(html_content):
    pdf_buffer = io.BytesIO()

    # Create HTML object from string
    html = HTML(string=html_content)

    # Generate PDF
    html.write_pdf(pdf_buffer)

    # Return buffer to start of file
    pdf_buffer.seek(0)
    return pdf_buffer
