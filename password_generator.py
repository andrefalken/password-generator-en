# Import function to choose the characters
from random import choices, choice, randint
import string

# Import the characters module and word list
from characters import characters
from word_list import english_words


def password_generator(quantity: int) -> str:
    """
    This function generates a human-readable but secure password
    Format: Word1Word2Word3_SpecialCharacter1234
    parameter quantity: Approximate quantity of password characters
    return: Return a string with the password
    """

    # Calculate how many words we need (each word contributes about 4-8 characters)
    # We want the total to be approximately equal to the requested quantity
    target_length = quantity - 5  # Subtract 5 for special char and 4 digits

    password_parts = []
    current_length = 0

    # Add words until we reach the target length
    while current_length < target_length:
        word = choice(english_words)
        # Capitalize the word (first letter uppercase, rest lowercase)
        capitalized_word = word.capitalize()
        password_parts.append(capitalized_word)
        current_length += len(capitalized_word)

        # Don't add too many words if the quantity is small
        if len(password_parts) >= 3 and current_length >= target_length * 0.7:
            break

    # Join all words together
    password = ''.join(password_parts)

    # Add a special character
    special_characters = "!@#$%&*_-+=?"
    password += choice(special_characters)

    # Add 4 random digits
    password += ''.join(choices(string.digits, k=4))

    # If the password is too long, truncate it
    if len(password) > quantity:
        password = password[:quantity]

    return password


if __name__ == '__main__':
    password = password_generator(20)
    print(f"Generated password: {password}")