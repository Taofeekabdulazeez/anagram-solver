import json
import logging
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def load_anagram_map(filepath):
    """
    Load the preprocessed anagram map from a JSON file.
    
    Args:
        filepath (str): Path to the JSON file containing the anagram map.

    Returns:
        dict: The loaded anagram map.
    """
    logging.info(f"Loading anagram map from {filepath}")
    try:
        with open(filepath, "r") as file:
            anagram_map = json.load(file)
        logging.info(f"Anagram map loaded successfully with {len(anagram_map)} entries")
        return anagram_map
    except FileNotFoundError:
        logging.error(f"File not found: {filepath}")
        return {}
    except json.JSONDecodeError:
        logging.error(f"Error decoding JSON file: {filepath}")
        return {}

def find_anagrams(word, anagram_map, sub_word_map, canonical_map):
    """
    Find anagrams of a given word and its subwords using the preprocessed anagram and subword maps.

    Args:
        word (str): The word for which to find anagrams.
        anagram_map (dict): The preprocessed anagram map.
        sub_word_map (dict): The preprocessed subword map.

    Returns:
        list: A list of anagrams for the given word and its subwords.
    """
    word = word.strip().lower()  # Standardize the input
    canonical_form = canonical_map.get(word, ''.join(sorted(word)))  # Compute the canonical form
    
    # Initialize result list to store anagrams
    result_anagrams = set()  # Use a set to avoid duplicates
    
    logging.info(f"Looking up anagrams for the word: {word} (Canonical form: {canonical_form})")
    
    # Get anagrams for the input word itself
    word_anagrams = anagram_map.get(canonical_form, [])
    if word_anagrams:
        logging.debug(f"Anagrams for the word '{word}': {word_anagrams}")
        result_anagrams.update(word_anagrams)
    
    # Get subwords for the input word
    subwords = sub_word_map.get(word, [])
    logging.info(f"Subwords of '{word}': {subwords}")
    
    # Get anagrams for each subword
    for subword in subwords:
        subword_canonical = canonical_map.get(subword, ''.join(sorted(subword)))   # Compute canonical form for the subword
        subword_anagrams = anagram_map.get(subword_canonical, [])
        if subword_anagrams:
            logging.debug(f"Anagrams for subword '{subword}': {subword_anagrams}")
            result_anagrams.update(subword_anagrams)
    
    return list(result_anagrams)

if __name__ == "__main__":
    # Path to the anagram map JSON file
    ANAGRAM_MAP_PATH = "anagram_map.json"
    SUBWORD_MAP_PATH = "subword_map.json"
    CANONICAL_MAP_PATH = "canonical_map.json"

    # Load the preprocessed anagram map
    anagram_map = load_anagram_map(ANAGRAM_MAP_PATH)
    sub_word_map = load_anagram_map(SUBWORD_MAP_PATH)
    canonical_map = load_anagram_map(CANONICAL_MAP_PATH)

    # Prompt user for input
    while True:
        word = input("Enter a word to find its anagrams (or type 'exit' to quit): ").strip()
        if word.lower() == "exit":
            print("Goodbye!")
            break

        if not word:
            print("Please enter a valid word.")
            continue

        # Find anagrams
        start_time = time.time()  # Start the timer
        anagrams = find_anagrams(word, anagram_map, sub_word_map, canonical_map)  # Call the function
        end_time = time.time()
        if anagrams:
            logging.info(f"Number of anagrams: {len(anagrams)}")
            logging.info(f"Time taken: {end_time - start_time:.6f} seconds")
            print(f"Anagrams of '{word}': {', '.join(anagrams)}")
        else:
            print(f"No anagrams found for '{word}'.")
