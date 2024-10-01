import os
import json

# Get the directory of the current script
current_directory = os.path.dirname(os.path.abspath(__file__))

# List all files in the current directory
file_names = [f for f in os.listdir(current_directory) if os.path.isfile(os.path.join(current_directory, f))]

# Define the output JSON file name
output_json_file = os.path.join(current_directory, 'file_names.json')

# Write the file names to the JSON file
with open(output_json_file, 'w') as json_file:
    json.dump(file_names, json_file)

print(f"File names have been written to {output_json_file}")
