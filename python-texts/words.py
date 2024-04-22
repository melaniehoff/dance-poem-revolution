
import re
from nltk.corpus import words
english_words = set(words.words())
def extract_words(file_path):
    words_without_punctuation = []
    with open(file_path, 'r') as file:
        data = file.read()
        words = re.findall(r'\b\w+\b', data)  # Extract words without punctuation
        words_without_punctuation.extend(words)
    return words_without_punctuation
def filter_english_words(words):
    return [word.lower() for word in words if word.lower() in english_words]
def main():
    text_files = ['2020-RAD.txt','communist-manifesto.txt', 'audre-masters-tools.txt', 'revolution-will-not-be-televised.txt'] 
    english_words_list = []
    for file_path in text_files:
        words = extract_words(file_path)
        english_words_list.extend(filter_english_words(words))
    english_words_string = '" , "'.join(english_words_list)
    with open('english_words.txt', 'w') as output_file:
        output_file.write(english_words_string)
if __name__ == "__main__":
    main()