#!/bin/sh

if [ "$1" = "-m" ]; then
  message="$2"
else
  message="no comment"
fi

git add .
git commit -m "$message"
git push
clear