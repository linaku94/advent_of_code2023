import re


def word_or_number_to_int(number_word):
    word_to_int = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'zero': 0,
    }
    return word_to_int.get(number_word) if number_word in word_to_int.keys() else int(number_word)


def sum_first_and_last_number(numbers):
    return sum(
        [word_or_number_to_int(number[0]) * 10 + word_or_number_to_int(number[-1]) for number in numbers])


def read_input_with_pattern(filename, pattern):
    with open(filename, "r") as file:
        return [re.findall(pattern, line.strip()) for line in file.readlines()]


## part 1
numbers_in_list = read_input_with_pattern("input.txt", r"\d")
print(f"Part 1: {sum_first_and_last_number(numbers_in_list)}")

## part 2
numbers_in_list = read_input_with_pattern("input.txt", r"(?=(one|two|three|four|five|six|seven|eight|nine|zero|\d))")
print(f"Part 2: {sum_first_and_last_number(numbers_in_list)}")
