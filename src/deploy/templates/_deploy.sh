#!/bin/bash

DIRECTORY=public
USER=<%= deployUsername %>
DOMAIN=<%= deployDomain %>
BRANCH="$(git symbolic-ref --short -q HEAD)"

if [ "$BRANCH" = "master" ]
then
  PROJECT="$1"
else
  PROJECT="$1-$BRANCH"
  echo "On $BRANCH branch, deploying to $PROJECT"
fi

if [ -d "$DIRECTORY" ];
then
  cd $DIRECTORY
  ssh $USER@$DOMAIN "mkdir -p htdocs/$PROJECT" && scp -r . $USER@$DOMAIN:htdocs/$PROJECT/
  open http://$DOMAIN/$PROJECT/
else
  echo "$DIRECTORY does not exist!"
fi
