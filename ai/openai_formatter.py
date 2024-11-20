import json

def convert_json_to_jsonl(input_file, output_file):
    """
    Converts a JSON file to a JSONL file with the specified format.

    Args:
        input_file (str): Path to the input JSON file.
        output_file (str): Path to the output JSONL file.
    """
    with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
        data = json.load(infile)
        for entry in data:
            json_entry = {
                "messages": [
                    {"role": "user", "content": entry.get("prompt", "")},
                    {"role": "assistant", "content": entry.get("completion", "")}
                ]
            }
            outfile.write(json.dumps(json_entry) + '\n')

# Replace these with the paths to your input and output files
input_json_file = 'input.json'
output_jsonl_file = 'output.jsonl'

# Run the conversion
convert_json_to_jsonl(input_json_file, output_jsonl_file)
