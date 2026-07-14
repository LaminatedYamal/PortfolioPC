import os
import json
import urllib.request
import urllib.parse
import time

def download_image(url, filepath):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(filepath, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Downloaded to {filepath}")
        return True
    except Exception as e:
        print(f"Failed: {e}")
        return False

def get_itunes_artwork(term):
    try:
        query = urllib.parse.quote(term)
        url = f"https://itunes.apple.com/search?term={query}&limit=1"
        headers = {'User-Agent': 'Mozilla/5.0'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data['results']:
                artwork_url = data['results'][0].get('artworkUrl100', '')
                if artwork_url:
                    return artwork_url.replace('100x100bb', '600x600bb')
    except Exception as e:
        print(f"iTunes error for '{term}': {e}")
    return None

time.sleep(3) # wait for rate limits to clear

# 1. True Detective
url_td = get_itunes_artwork("True Detective tv")
if url_td:
    download_image(url_td, "public/images/shelf/tv/true_detective.jpg")

time.sleep(3)

# 2. The Ranch
url_tr = get_itunes_artwork("The Ranch tv")
if url_tr:
    download_image(url_tr, "public/images/shelf/tv/the_ranch.jpg")

print("Done fallbacks!")
