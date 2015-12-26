#!/bin/bash

git init
git config user.name "Travis CI"
git config user.email "steven.edouard1@gmail.com"

echo 'Adding files to local repo '
ls -ltr
git add .
git commit -m "Deploy"

GIT_USERNAME="dokku"
GIT_TARGET_URL="${GIT_USERNAME}@${AZURE_WA_GIT_TARGET}:${DOKKU_APPNAME}"

eval "$(ssh-agent -s)"
ssh-agent -s

# write the trusted host to the known hosts file
# to avoid a prompt when connecting to it via ssh
echo $DOKKU_SSH_PUBLIC_KNOWN_HOST > ~/.ssh/known_hosts

chmod 600 ./dokku-deploy
ssh-add ./dokku-deploy

echo 'Private keys added. Starting Dokku Deployment'
git remote add $GIT_USERNAME $GIT_TARGET_URL

echo 'deploying to Dokku...'
git push dokku master -f

echo 'Deployed Latest Version of GitTrack'

