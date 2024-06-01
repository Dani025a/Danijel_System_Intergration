import requests
from bs4 import BeautifulSoup
import json

def scrape_proshop(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers)
        
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        products = []

        product_containers = soup.find_all('li', class_='row toggle')
        for container in product_containers:
            title_tag = container.find('h2', class_='truncate-overflow')
            price_tag = container.find('span', class_='site-currency-lg')
            discount_tag = container.find('span', class_='position-absolute')
            link_tag = container.find('a', class_='show')
            availability_tag = container.find('div', class_='site-stock-text')
            
            title = title_tag.text.strip() if title_tag else "N/A"
            price = price_tag.text.strip() if price_tag else "N/A"
            discount = discount_tag.text.strip() if discount_tag else "N/A"
            link = "https://www.proshop.dk" + link_tag['href'] if link_tag else "N/A"
            availability = availability_tag.text.strip() if availability_tag else "N/A"
            
            product_data = {
                'title': title,
                'price': price,
                'discount': discount,
                'link': link,
                'availability': availability
            }
            products.append(product_data)
        
        with open('proshop_products.json', 'w', encoding='utf-8') as f:
            json.dump(products, f, ensure_ascii=False, indent=4)
        
        print("Data has been saved to proshop_products.json")
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the page: {e}")

url = 'https://www.proshop.dk/SUPER-DAYS-Computer-Printer-Tilbehoer'

scrape_proshop(url)
