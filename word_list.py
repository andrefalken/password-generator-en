# Expanded English word list for password generator
# Words organized by length for efficient password generation

english_words = [
    # 1-character words (common symbols and letters)
    "a", "i", "o",

    # 2-character words
    "be", "to", "of", "in", "it", "is", "he", "we", "my", "up",
    "go", "me", "us", "no", "so", "or", "by", "do", "an", "at",

    # 3-character words
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "had",
    "was", "one", "our", "out", "day", "get", "has", "him", "his", "how",

    # 4-character words
    "that", "with", "have", "this", "will", "your", "from", "they", "know", "want",
    "been", "good", "much", "some", "time", "very", "when", "come", "here", "make",

    # 5-character words
    "about", "other", "which", "their", "there", "first", "would", "these", "click", "place",
    "after", "where", "right", "think", "three", "years", "world", "house", "again", "great",

    # 6-character words
    "people", "before", "should", "because", "little", "number", "system", "online", "social", "mobile",
    "global", "market", "design", "school", "family", "friend", "travel", "health", "nature", "energy",

    # 7-character words
    "through", "project", "service", "company", "digital", "network", "contact", "privacy", "content", "feature",
    "quality", "freedom", "journey", "morning", "evening", "weather", "history", "science", "music", "culture",

    # 8-character words
    "business", "password", "security", "computer", "internet", "software", "hardware", "database", "strategy",
    "creative",
    "mountain", "universe", "adventure", "knowledge", "language", "peaceful", "powerful", "colorful", "beautiful",
    "wonderful",

    # 9-character words
    "education", "generator", "interface", "beautiful", "wonderful", "excellent", "fantastic", "brilliant", "important",
    "different",
    "community", "celebrate", "challenge", "behaviour", "knowledge", "beautiful", "wonderful", "excellent", "fantastic",
    "brilliant",

    # 10-character words
    "technology", "innovation", "creativity", "leadership", "management", "production", "efficiency", "successful",
    "wonderland", "friendship",
    "motivation", "confidence", "atmosphere", "celebration", "foundation", "revolution", "protection", "investment",
    "discovery", "adventurous"
]

# Additional categorization by length for optimized selection
words_by_length = {
    1: ["a", "i", "o"],
    2: ["be", "to", "of", "in", "it", "is", "he", "we", "my", "up", "go", "me", "us", "no", "so", "or", "by", "do",
        "an", "at"],
    3: ["the", "and", "for", "are", "but", "not", "you", "all", "can", "had", "was", "one", "our", "out", "day", "get",
        "has", "him", "his", "how"],
    4: ["that", "with", "have", "this", "will", "your", "from", "they", "know", "want", "been", "good", "much", "some",
        "time", "very", "when", "come", "here", "make"],
    5: ["about", "other", "which", "their", "there", "first", "would", "these", "click", "place", "after", "where",
        "right", "think", "three", "years", "world", "house", "again", "great"],
    6: ["people", "before", "should", "because", "little", "number", "system", "online", "social", "mobile", "global",
        "market", "design", "school", "family", "friend", "travel", "health", "nature", "energy"],
    7: ["through", "project", "service", "company", "digital", "network", "contact", "privacy", "content", "feature",
        "quality", "freedom", "journey", "morning", "evening", "weather", "history", "science", "music", "culture"],
    8: ["business", "password", "security", "computer", "internet", "software", "hardware", "database", "strategy",
        "creative", "mountain", "universe", "adventure", "knowledge", "language", "peaceful", "powerful", "colorful",
        "beautiful", "wonderful"],
    9: ["education", "generator", "interface", "beautiful", "wonderful", "excellent", "fantastic", "brilliant",
        "important", "different", "community", "celebrate", "challenge", "behaviour", "knowledge", "beautiful",
        "wonderful", "excellent", "fantastic", "brilliant"],
    10: ["technology", "innovation", "creativity", "leadership", "management", "production", "efficiency", "successful",
         "wonderland", "friendship", "motivation", "confidence", "atmosphere", "celebration", "foundation",
         "revolution", "protection", "investment", "discovery", "adventurous"]
}


def get_words_by_length(length):
    """Get words of specific length"""
    return words_by_length.get(length, [])


def get_words_up_to_length(max_length):
    """Get all words up to a specific maximum length"""
    return [word for word in english_words if len(word) <= max_length]


# Test function to verify the word list
if __name__ == "__main__":
    print("📊 Word List Statistics:")
    for length in range(1, 11):
        words = get_words_by_length(length)
        print(f"Length {length}: {len(words)} words")

    print(f"\n📝 Total words: {len(english_words)}")
    print("✅ Word list is ready for use!")