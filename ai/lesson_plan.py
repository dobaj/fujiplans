import requests
from bs4 import BeautifulSoup
import os
import time
import json
import csv

# Base URL
base_url = 'https://www.teachercreated.com/lessons/'

# Headers to mimic a browser request
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'}

# Get all lesson links
def get_lesson_links():
    response = requests.get(base_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    lesson_links = []
    
    # Adjust this based on specific link structure in HTML
    for link in soup.find_all('a', href=True):
        href = link['href']
        if '/lessons/' in href and href != '/lessons/':
            full_url = base_url + href.split('/lessons/')[-1]
            lesson_links.append(full_url)
    
    return lesson_links

# Download and parse the lesson content
def parse_lesson_page(url):
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extracting specific content
    title = soup.find('h2').text if soup.find('h2') else 'No title'
    description = soup.find('p').text if soup.find('p') else 'No description'
    objective = soup.find(string="Objective").find_next('p').text if soup.find(string="Objective") else 'No objective'
    directions = soup.find(string="Directions").find_next('p').text if soup.find(string="Directions") else 'No directions'
    resources = soup.find(string="Resources").find_next('ul').get_text(separator=", ") if soup.find(string="Resources") else 'No resources'
    
    # Creating a structured dictionary of the data
    lesson_data = {
        "Title": title,
        "Description": description,
        "Objective": objective,
        "Directions": directions,
        "Resources": resources
    }
    
    return lesson_data

# Save data to JSON and CSV files
def save_data(lesson_data_list):
    # Save to JSON
    with open("lesson_data.json", "w", encoding="utf-8") as json_file:
        json.dump(lesson_data_list, json_file, indent=4, ensure_ascii=False)
    
    # Save to CSV
    csv_columns = ["Title", "Description", "Objective", "Directions", "Resources"]
    with open("lesson_data.csv", "w", newline="", encoding="utf-8") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=csv_columns)
        writer.writeheader()
        for lesson_data in lesson_data_list:
            writer.writerow(lesson_data)

# Main script
def main():
    lesson_links = get_lesson_links()
    print(f"Found {len(lesson_links)} lesson links.")
    lesson_data_list = []
    
    for link in lesson_links:
        lesson_data = parse_lesson_page(link)
        lesson_data_list.append(lesson_data)
        
        # Optional: Reduce delay time for faster execution
        time.sleep(0.1)
    
    save_data(lesson_data_list)
    print("Data saved to lesson_data.json and lesson_data.csv")

if __name__ == "__main__":
    main()
