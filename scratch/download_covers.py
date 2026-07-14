import os
import json
import urllib.request
import urllib.parse
import time

# Define lists of items to download
books = [
    ("the_old_man_and_the_sea", "The Old Man and the Sea Ernest Hemingway"),
    ("the_great_gatsby", "The Great Gatsby F. Scott Fitzgerald"),
    ("galveston", "Galveston Nic Pizzolatto"),
    ("become_what_you_are", "Become What You Are Alan Watts"),
    ("a_verdadeira_historia_dos_voos_da_cia", "A Verdadeira Historia dos Voos da CIA A. C. Thompson"),
    ("the_art_of_war", "The Art of War Sun Tzu"),
    ("paddle_your_own_canoe", "Paddle Your Own Canoe Nick Offerman"),
    ("no_country_for_old_men", "No Country for Old Men Cormac McCarthy"),
    ("meditations", "Meditations Marcus Aurelius"),
    ("os_carrascos_do_kidon", "Os Carrascos do Kidon Eric Frattini")
]

albums = [
    ("sob_rock", "Sob Rock John Mayer"),
    ("continuum", "Continuum John Mayer"),
    ("western_swing_and_waltzes", "Western Swing & Waltzes Colter Wall"),
    ("songs_of_the_plains", "Songs of the Plains Colter Wall"),
    ("nothing_was_the_same", "Nothing Was the Same Drake"),
    ("for_the_good_times", "For the Good Times Dean Martin"),
    ("656", "656 Roc Marciano"),
    ("the_nashville_sound", "The Nashville Sound Jason Isbell"),
    ("weathervanes", "Weathervanes Jason Isbell"),
    ("something_more_than_free", "Something More Than Free Jason Isbell")
]

movies = [
    ("no_country_for_old_men", "No Country for Old Men movie"),
    ("palm_springs", "Palm Springs movie 2020"),
    ("blade_runner_2049", "Blade Runner 2049 movie"),
    ("interstellar", "Interstellar movie"),
    ("once_upon_a_time_in_hollywood", "Once Upon a Time in Hollywood movie"),
    ("rio_bravo", "Rio Bravo movie 1959"),
    ("hostiles", "Hostiles movie 2017"),
    ("war_dogs", "War Dogs movie 2016"),
    ("the_assassination_of_jesse_james", "The Assassination of Jesse James by the Coward Robert Ford"),
    ("killers_of_the_flower_moon", "Killers of the Flower Moon movie")
]

tv_shows = [
    ("the_sopranos", "The Sopranos tv show"),
    ("true_detective", "True Detective tv show"),
    ("succession", "Succession tv show"),
    ("mad_men", "Mad Men tv show"),
    ("dexter", "Dexter tv show"),
    ("the_ranch", "The Ranch tv show"),
    ("justified", "Justified tv show"),
    ("reacher", "Reacher tv show"),
    ("the_penguin", "The Penguin tv show 2024"),
    ("the_righteous_gemstones", "The Righteous Gemstones tv show")
]

games = [
    ("cyberpunk_2077", "Cyberpunk 2077 game"),
    ("disco_elysium", "Disco Elysium game"),
    ("the_outer_worlds", "The Outer Worlds game"),
    ("rdr2", "Red Dead Redemption 2 game"),
    ("the_last_of_us", "The Last of Us game"),
    ("ratchet_gladiator", "Ratchet Gladiator game"),
    ("the_witcher_3", "The Witcher 3 Wild Hunt game"),
    ("mafia_definitive_edition", "Mafia Definitive Edition game"),
    ("mafia_2", "Mafia II game"),
    ("rise_of_the_tomb_raider", "Rise of the Tomb Raider game")
]

def download_image(url, filepath):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(filepath, 'wb') as out_file:
                out_file.write(response.read())
        print(f"  Successfully downloaded to {filepath}")
        return True
    except Exception as e:
        print(f"  Failed to download {url}: {e}")
        return False

def get_itunes_artwork(term, media_type="all"):
    try:
        query = urllib.parse.quote(term)
        url = f"https://itunes.apple.com/search?term={query}&limit=1&media={media_type}"
        headers = {'User-Agent': 'Mozilla/5.0'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data['results']:
                artwork_url = data['results'][0].get('artworkUrl100', '')
                # Upgrade size to 600x600 for better quality
                if artwork_url:
                    artwork_url = artwork_url.replace('100x100bb', '600x600bb')
                return artwork_url
    except Exception as e:
        print(f"  iTunes Search failed for '{term}': {e}")
    return None

def get_openlibrary_cover(title):
    try:
        query = urllib.parse.quote(title)
        url = f"https://openlibrary.org/search.json?title={query}&limit=1"
        headers = {'User-Agent': 'Mozilla/5.0'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data['docs'] and 'cover_i' in data['docs'][0]:
                cover_id = data['docs'][0]['cover_i']
                return f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg"
    except Exception as e:
        print(f"  OpenLibrary search failed for '{title}': {e}")
    return None

def process_category(category_name, items, dir_path, fetch_fn):
    print(f"\nProcessing category: {category_name}")
    os.makedirs(dir_path, exist_ok=True)
    
    for filename, query in items:
        # We will save as .jpg or .png depending on the source, let's enforce .jpg for uniformity
        filepath = os.path.join(dir_path, f"{filename}.jpg")
        print(f"Searching for '{query}'...")
        
        # Try primary fetch function
        img_url = fetch_fn(query)
        
        # Fallback to iTunes all search if primary failed
        if not img_url:
            print(f"  Trying iTunes general search fallback...")
            img_url = get_itunes_artwork(query)
            
        if img_url:
            print(f"  Found URL: {img_url}")
            download_image(img_url, filepath)
        else:
            print(f"  No image found for '{query}'")
        time.sleep(0.5)  # rate limit safety

# Base path to public images
base_dir = "public/images/shelf"

# 1. Books (Use OpenLibrary primarily, iTunes general search as fallback)
process_category("books", books, os.path.join(base_dir, "books"), get_openlibrary_cover)

# 2. Albums (Use iTunes music primarily)
process_category("albums", albums, os.path.join(base_dir, "albums"), lambda q: get_itunes_artwork(q, "music"))

# 3. Movies (Use iTunes movie primarily)
process_category("movies", movies, os.path.join(base_dir, "movies"), lambda q: get_itunes_artwork(q, "movie"))

# 4. TV Shows (Use iTunes tvShow primarily)
process_category("tv", tv_shows, os.path.join(base_dir, "tv"), lambda q: get_itunes_artwork(q, "tvShow"))

# 5. Games (Use iTunes software or general search primarily)
process_category("games", games, os.path.join(base_dir, "games"), lambda q: get_itunes_artwork(q, "software"))

print("\nDone processing all cover arts!")
