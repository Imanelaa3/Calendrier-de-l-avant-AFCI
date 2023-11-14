#!/bin/sh

if [ "$1" = "-m" ]; then
  message="$2"
else
  message="no comment"
fi

git add --all
git commit -m "$message"
git push
clear