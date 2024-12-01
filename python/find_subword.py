import json
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()]
)

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """
        Insert a word into the Trie.
        """
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
        logging.debug(f"Inserted word into Trie: {word}")

    def find_subwords(self, word):
        """
        Find all valid subwords of a word using the Trie.
        """
        subwords = set()
        word_length = len(word)
        logging.info(f"Finding subwords of {word}")

        def backtrack(current, index, node, used):
            """
            Backtracking function to find subwords.
            """
            if node.is_end_of_word and current not in subwords:
                subwords.add(current)
                logging.debug(f"Found valid subword: {current}")

            for i in range(word_length):
                if i not in used and word[i] in node.children:
                    used.add(i)
                    backtrack(current + word[i], i, node.children[word[i]], used)
                    used.remove(i)

        backtrack("", -1, self.root, set())
        return subwords

def load_words(file_path):
    """
    Load words from a text file.
    """
    logging.info(f"Loading words from file: {file_path}")
    with open(file_path, 'r') as file:
        words = [line.strip().lower() for line in file if line.strip()]
    logging.info(f"Loaded {len(words)} words from file.")
    return words

def generate_subword_map(words):
    """
    Generate a map of words to their subwords.
    """
    logging.info("Building the Trie with the word list.")
    trie = Trie()
    for word in words:
        trie.insert(word)
    logging.info("Trie construction completed.")

    logging.info("Generating subword map.")
    subword_map = {}
    for word in words:
        subwords = trie.find_subwords(word)
        subword_map[word] = list(subwords)
        logging.debug(f"Subwords for '{word}': {subwords}")
    logging.info("Subword map generation completed.")
    return subword_map

def save_subword_map(subword_map, output_file):
    """
    Save the subword map to a JSON file.
    """
    logging.info(f"Saving subword map to file: {output_file}")
    with open(output_file, 'w') as file:
        json.dump(subword_map, file, indent=2)
    logging.info("Subword map saved successfully.")

if __name__ == "__main__":
    try:
        # Input and output file paths
        input_file = "english.txt"
        output_file = "subword_map.json"

        # Load words from the text file
        words = load_words(input_file)

        # Generate the subword map
        subword_map = generate_subword_map(words)

        # Save the subword map to a JSON file
        save_subword_map(subword_map, output_file)

        logging.info(f"Subword map process completed. Data saved to {output_file}.")
    except Exception as e:
        logging.error(f"An error occurred: {e}", exc_info=True)
