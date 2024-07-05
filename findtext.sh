#! /usr/bin/bash

# Ask the user for the folder path
echo "Which folder to search:"
read -r folder

# Ask the user for the text to search for
echo "Searched text:"
read -r text

# Check if the folder exists
if [ ! -d "$folder" ]; then
  echo "The specified folder does not exist."
  exit 1
fi

# Perform the search using grep
echo "Searching for '$text' in '$folder'..."
grep -Rnw "$folder" -e "$text"

# Check the exit status of grep
if [ $? -eq 0 ]; then
  echo "Search completed successfully."
else
  echo "Search failed or no results found."
fi
