#!/bin/bash

DIRECTORY=public
USER=<%= deployUsername %>
DOMAIN=<%= deployDomain %>

if [ -d .git ]; then
  BRANCH="$(git symbolic-ref --short -q HEAD)";
else
  echo -e "\033[1;33mwarning: \033[0mCurrent directory is not a git repository"
  BRANCH="master"
fi;

if [ "$BRANCH" = "master" ]
then
  PROJECT="$1"
else
  PROJECT="$1-$BRANCH"
  echo "On $BRANCH branch, deploying to $PROJECT"
fi

if [ -d "$DIRECTORY" ];
then
  echo "Uploading to server"
  cd $DIRECTORY
  ssh $USER@$DOMAIN "mkdir -p htdocs/$PROJECT" && scp -r . $USER@$DOMAIN:htdocs/$PROJECT/
  open http://$DOMAIN/$PROJECT/
else
  echo -e "\033[0;31merror: \033[0m$DIRECTORY directory does not exist!"
fi
