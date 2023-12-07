#!/bin/sh

if [ -n "$1" ] && [ "$1" != "''" ] && [ "$1" != '""' ]; then
  message="$1"
else
  message="no comment"
fi

git add --all
git commit -m "$message"
git push
clear