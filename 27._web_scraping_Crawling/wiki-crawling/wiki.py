import requests
from bs4 import BeautifulSoup
import json

def get_links_from_page(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        links = []
        for a_tag in soup.find_all('a', href=True):
            link = a_tag['href']
            if link.startswith('/'):
                link = url + link
            links.append(link)
        return links
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return []

def crawl_website(start_url, max_pages=50):
    to_visit = [start_url]
    visited = set()
    all_links = []

    while to_visit and len(visited) < max_pages:
        current_url = to_visit.pop(0)
        if current_url in visited:
            continue
        print(f"Crawling: {current_url}")
        visited.add(current_url)
        links = get_links_from_page(current_url)
        all_links.extend(links)
        for link in links:
            if link not in visited and link not in to_visit:
                to_visit.append(link)

    return list(set(all_links))

if __name__ == "__main__":
    start_url = "https://da.wikipedia.org"
    all_links = crawl_website(start_url)
    with open("wiki_links.json", "w") as file:
        json.dump(all_links, file, indent=4)
    print(f"Saved {len(all_links)} links to wiki_links.json")
