#!/bin/bash

mkdir -p test
echo "theme" > test/theme.txt

mkdir -p test/hidden
touch test/hidden/.hidden

mkdir -p test/html
touch test/html/index.html

mkdir -p test/path/to
touch test/path/ignore
touch test/path/to/nested.txt
