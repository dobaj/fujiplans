import os
import io
from django.core.exceptions import ValidationError

MAX_UPLOAD_SIZE = 20 * 1024 * 1024


def validate_file_type(file_obj):
    # First, check the file extension
    filename = file_obj.name or "lesson_plan.pdf"
    file_ext = os.path.splitext(filename)[1].lower()

    # Check if the extension is .pdf
    if file_ext != ".pdf":
        raise ValidationError(
            f"File extension '{file_ext}' not allowed. Only PDF files are allowed."
        )

    return "application/pdf"


def validate_file_size(file_obj):
    # Get file size
    file_size = file_obj.size

    # Check if file size exceeds the limit
    if file_size > MAX_UPLOAD_SIZE:
        max_size_mb = MAX_UPLOAD_SIZE / (1024 * 1024)
        actual_size_mb = file_size / (1024 * 1024)
        raise ValidationError(
            f"File size exceeds the limit of {max_size_mb:.1f} MB. "
            f"Your file is {actual_size_mb:.1f} MB."
        )

    return file_size


def handle_uploaded_file(file_obj):
    # Validate file type and size
    file_type = validate_file_type(file_obj)
    file_size = validate_file_size(file_obj)

    # Return file metadata
    return {
        "name": file_obj.name or "lesson_plan.pdf",
        "size": file_size,
        "type": file_type,
    }


def validate_buffer_size(buffer):
    # Move position to the end to get full size
    buffer.seek(0, io.SEEK_END)

    file_size = buffer.tell()

    # Reset buffer position to start
    buffer.seek(0)

    # Check if file size exceeds the limit
    if file_size > MAX_UPLOAD_SIZE:
        max_size_mb = MAX_UPLOAD_SIZE / (1024 * 1024)
        actual_size_mb = file_size / (1024 * 1024)
        raise ValidationError(
            f"File size exceeds the limit of {max_size_mb:.1f} MB. "
            f"Your file is {actual_size_mb:.1f} MB."
        )

    return file_size


def validate_pdf_buffer(buffer):
    file_size = validate_buffer_size(buffer)

    return {
        "name": "lesson_plan.pdf",
        "size": file_size,
        "type": "application/pdf",
    }
