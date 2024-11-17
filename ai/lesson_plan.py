import requests
from bs4 import BeautifulSoup
import json
import csv
import time

# Base URL
base_url = 'https://www.teachercreated.com/lessons/'

# Headers to mimic a browser request
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'}

# Get lesson links and grade levels from the main page
def get_lesson_links_and_grades():
    response = requests.get(base_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    lessons = []
    
    # Locate the lessons table and iterate over rows
    table_rows = soup.select("table tbody tr")
    for row in table_rows:
        link_tag = row.find("a", href=True)
        grade_td = row.find_all("td")[1]  # Second column for grade level
        
        if link_tag and grade_td:
            lesson_url = link_tag['href']
            lesson_title = link_tag.text.strip()
            grade_level = grade_td.text.strip()
            
            lessons.append({
                "Title": lesson_title,
                "URL": f"https://www.teachercreated.com{lesson_url}",
                "Grade Level": grade_level
            })
    
    return lessons

# Parse individual lesson pages for additional details
def parse_lesson_page(url):
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    description = soup.find('p').text if soup.find('p') else 'No description'
    objective = soup.find(string="Objective").find_next('p').text if soup.find(string="Objective") else 'No objective'
    directions = soup.find(string="Directions").find_next('p').text if soup.find(string="Directions") else 'No directions'
    resources = soup.find(string="Resources").find_next('ul').get_text(separator=", ") if soup.find(string="Resources") else 'No resources'
    
    return {
        "Description": description,
        "Objective": objective,
        "Directions": directions,
        "Resources": resources
    }

# Save data to JSON and CSV files
def save_data(lesson_data_list):
    # Save to JSON
    with open("lesson_data_with_grades.json", "w", encoding="utf-8") as json_file:
        json.dump(lesson_data_list, json_file, indent=4, ensure_ascii=False)
    
    # Save to CSV with everything under "Output" column
    csv_columns = ["Output"]
    with open("lesson_data_with_grades.csv", "w", newline="", encoding="utf-8") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=csv_columns)
        writer.writeheader()
        for lesson_data in lesson_data_list:
            # Combine Title, Grade Level, Description, Objective, Directions, and Resources under "Output"
            output_text = (
                f"Title: {lesson_data['Title']}\n"
                f"Grade Level: {lesson_data['Grade Level']}\n"
                f"Description: {lesson_data['Description']}\n"
                f"Objective: {lesson_data['Objective']}\n"
                f"Directions: {lesson_data['Directions']}\n"
                f"Resources: {lesson_data['Resources']}"
            )
            writer.writerow({"Output": output_text})

# Main script
def main():
    lessons = get_lesson_links_and_grades()
    print(f"Found {len(lessons)} lessons.")

    lesson_data_list = []
    for lesson in lessons:
        additional_data = parse_lesson_page(lesson["URL"])
        
        # Combine the lesson data with additional details
        full_lesson_data = {**lesson, **additional_data}
        lesson_data_list.append(full_lesson_data)
        
        # Optional: pause to avoid overwhelming the server
        time.sleep(0.1)
    
    save_data(lesson_data_list)
    print("Data saved to lesson_data_with_grades.json and lesson_data_with_grades.csv")

if __name__ == "__main__":
    main()
