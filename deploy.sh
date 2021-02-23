#!/bin/sh
source .env
echo Logging into Stitch
realm-cli login --api-key=$REALM_PUBLIC_KEY --private-api-key=$REALM_PRIVATE_KEY
echo Importing from project directory
realm-cli import --app-id=$REALM_APPID --strategy=replace --path=$APP_PATH
echo Logging out
realm-cli logout
echo Deploy complete
sleep 200