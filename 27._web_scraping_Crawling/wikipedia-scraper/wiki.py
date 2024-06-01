import requests
from bs4 import BeautifulSoup
import json

def scrape_wikipedia(url):
    try:
        # Send a GET request to the URL with a User-Agent header
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers)
        
        # Checking if the request was successful
        response.raise_for_status()
        
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extracting the titels of the wiki site
        title = soup.find('h1', {'id': 'firstHeading'}).text
        
        # Extracting the first paragraph of the wiki site
        first_paragraph = soup.find('div', {'class': 'mw-parser-output'}).p.text
        
        # Prepare the data structure to hold the scraped content
        data = {
            'title': title,
            'first_paragraph': first_paragraph,
            'sections': []
        }
        
        # Extract all the subheadings and their respective paragraphs
        subheadings = soup.find_all(['h2', 'h3'])
        for subheading in subheadings:
            section = {
                'heading': subheading.text.strip(),
                'content': []
            }
            for sibling in subheading.find_next_siblings():
                if sibling.name in ['h2', 'h3']:
                    break
                if sibling.name == 'p':
                    section['content'].append(sibling.text.strip())
            data['sections'].append(section)
        
        # Save the data to a JSON file
        with open('wikipedia_scraping.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        
        print("Data has been saved to wikipedia_scraping.json")
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the page: {e}")

#The url we want to scrape
url = 'https://en.wikipedia.org/wiki/Web_scraping'


# running the def with the url as params
scrape_wikipedia(url)
