#!/bin/bash
DIR=$(dirname $(readlink -f "$0"))
CLEAN_DIR="$DIR/../"
echo "Cleaning directory $CLEAN_DIR"
find $CLEAN_DIR -type f \( -name '*.swp' -o -name '*~' -o -name '*.bak' -o -name '.netrwhist' \) -delete

