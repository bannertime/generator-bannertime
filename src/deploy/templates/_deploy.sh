#!/bin/bash

PROJECT="$1"
DIRECTORY=public
USER=<%= deployUsername %>
DOMAIN=<%= deployDomain %>

if [ -d "$DIRECTORY" ];
then
  cd public
  ssh $USER@$DOMAIN "mkdir -p htdocs/$PROJECT" && scp -r . $USER@$DOMAIN:htdocs/$PROJECT/
  open http://$DOMAIN/$PROJECT/
else
  echo "Public directory does not exist!"
fi
