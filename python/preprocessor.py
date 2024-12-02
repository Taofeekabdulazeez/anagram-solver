import json
import os
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler()
    ]
)

def preprocess_anagrams_from_json(folder_path):
    """
    Preprocess words from a JSON file and group them by their canonical anagram forms.

    Args:
        filename (str): Path to the JSON file containing words.

    Returns:
        dict: A dictionary mapping canonical forms to lists of anagrams.
    """
    anagram_map = {}

    for filename in sorted(os.listdir(folder_path)):
        file_path = os.path.join(folder_path, filename)

        logging.info(f"Starting to process file: {filename}")

        try:
            with open(file_path, 'r') as file:
                # Load words from JSON
                words = json.load(file)
                logging.info(f"Loaded {len(words)} words from {filename}")

                for word in words:
                    original_word = word  # Keep the original word for logging
                    word = word.strip().lower()
                    if word:
                        # Calculate the canonical form
                        canonical_form = ''.join(sorted(word))

                        # Add word to the anagram map
                        if canonical_form not in anagram_map:
                            anagram_map[canonical_form] = []
                            logging.debug(f"Created new entry for canonical form: {canonical_form}")
                        anagram_map[canonical_form].append(word)

                        logging.debug(f"Processed word: {original_word} -> Canonical form: {canonical_form}")
                    else:
                        logging.warning(f"Skipped empty or invalid word in {filename}")

        except json.JSONDecodeError:
            logging.error(f"Error decoding JSON file: {filename}", exc_info=True)

        logging.info(f"Finished processing file: {filename} with {len(anagram_map)} canonical forms")
    return anagram_map

if __name__ == "__main__":
    FOLDER_PATH = "C:/Users/USER/Desktop/Projects/anagram-solver/python/words"

    logging.info("Starting preprocessing of anagrams...")
    anagrams = preprocess_anagrams_from_json(FOLDER_PATH)

    # Save the result to a file
    output_path = "anagram_map.json"
    with open(output_path, "w") as f:
        json.dump(anagrams, f)
        logging.info(f"Anagram map saved to {output_path}")

    logging.info("Preprocessing completed.")
