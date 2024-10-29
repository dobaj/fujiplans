import csv
import json

# File paths
csv_file_path = "tagged_lesson_data.csv"  # Replace with your CSV file path if different
jsonl_file_path = "lesson_data_for_training.jsonl"

def convert_csv_to_jsonl(csv_file, jsonl_file):
    with open(csv_file, mode='r', encoding='utf-8') as csv_file:
        reader = csv.DictReader(csv_file)
        
        with open(jsonl_file, mode='w', encoding='utf-8') as jsonl_file:
            for row in reader:
                # Structure the JSONL entry with the roles "user" and "assistant" as required by GPT-4-turbo
                jsonl_entry = {
                    "messages": [
                        {"role": "user", "content": row["Input"]},
                        {"role": "assistant", "content": row["Output"]}
                    ]
                }

                # Write each entry to the JSONL file
                jsonl_file.write(json.dumps(jsonl_entry) + "\n")

    print(f"Data successfully converted to {jsonl_file_path}")

# Run the conversion function
convert_csv_to_jsonl(csv_file_path, jsonl_file_path)
