import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def preprocess_canonical_forms(dictionary_file, output_file):
    """
    Preprocess canonical forms for all words in the dictionary.

    Args:
        dictionary_file (str): Path to the dictionary file (one word per line).
        output_file (str): Path to save the canonical form map.
    """
    canonical_map = {}

    try:
        # Open the dictionary file
        logging.info(f"Reading dictionary file: {dictionary_file}")
        with open(dictionary_file, 'r') as file:
            for line in file:
                word = line.strip().lower()  # Clean and standardize the word
                if word:  # Skip empty lines
                    canonical_form = ''.join(sorted(word))  # Compute the canonical form
                    canonical_map[word] = canonical_form
                    logging.debug(f"Processed word: {word} -> Canonical form: {canonical_form}")

        # Save the canonical map to the output file
        logging.info(f"Saving canonical map to: {output_file}")
        with open(output_file, 'w') as out_file:
            json.dump(canonical_map, out_file)
            logging.info(f"Canonical map successfully saved to {output_file}")
    except FileNotFoundError:
        logging.error(f"File not found: {dictionary_file}", exc_info=True)
    except json.JSONDecodeError:
        logging.error(f"Error decoding JSON while saving canonical map to {output_file}", exc_info=True)
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}", exc_info=True)

if __name__ == "__main__":
    try:
        # Input and output file paths
        input_file = "english.txt"
        output_file = "canonical_map.json"

        # Preprocess canonical forms
        logging.info("Starting preprocessing of canonical forms.")
        preprocess_canonical_forms(input_file, output_file)
        logging.info("Preprocessing completed successfully.")
    except Exception as e:
        logging.error(f"An error occurred during preprocessing: {e}", exc_info=True)
