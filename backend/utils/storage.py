from google.cloud import storage
import os
import uuid
import json
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class GoogleCloudStorage:
    def __init__(self):
        self.client = storage.Client.from_service_account_info(
            json.loads(os.getenv("GS_CREDENTIALS"))
        )
        self.bucket = self.client.bucket(os.getenv("GS_BUCKET_NAME"))

    def upload_file(self, file_obj, destination_path=None, content_type=None):
        # Create a blob and upload the file
        blob = self.bucket.blob(destination_path)

        # Set content type if provided
        if content_type:
            blob.content_type = content_type

        # Upload the file
        blob.upload_from_file(file_obj, rewind=True)

        blob.make_public()

        # Return the public URL
        return {
            "url": blob.public_url,
            "path": destination_path,
        }

    def delete_file(self, file_path):
        blob = self.bucket.blob(file_path)

        if blob.exists():
            blob.delete()
            return True

        return False
