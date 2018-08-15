#!/usr/bin/env bash
set -e
# This script builds the frontend,
# it expects the source files to be in /mnt-input/
# and will write the files to /mnt-output/

#Installing dependencies
source /usr/local/nvm/nvm.sh

cd /mnt-input/source/cape-client && npm install
cd /mnt-input/source/authentication && npm install
cd /mnt-input/source/dashboard && npm install
cd /mnt-input/source/landing && npm install
cd /mnt-input/source/reduce && npm install


## Building npm modules
cd /mnt-input/source/cape-client && npm run build
cd /mnt-input/source/authentication && npm run build
cd /mnt-input/source/dashboard && npm run build
cd /mnt-input/source/landing && npm run build
cd /mnt-input/source/reduce && npm run build

## Renaming and copying to output
cp -r /mnt-input/source/authentication/dist/. /mnt-output/
cp -r /mnt-input/source/dashboard/dist/. /mnt-output/
cp -r /mnt-input/source/reduce/dist/. /mnt-output/
cp -r /mnt-input/source/landing/dist/. /mnt-output/
mv /mnt-output/landing.html /mnt-output/index.html

#Install slate
cd /tmp
gem install bundler
wget https://github.com/lord/slate/archive/bdb693031027c2e5af77cb709cb86836c3e2e74c.zip -O slate.zip
unzip slate.zip
cd slate-bdb693031027c2e5af77cb709cb86836c3e2e74c
bundle install
cd ..

cp -r /mnt-input/api_documentation/. slate-bdb693031027c2e5af77cb709cb86836c3e2e74c/source/
cd /tmp/slate-bdb693031027c2e5af77cb709cb86836c3e2e74c
bundle exec middleman build --verbose --clean
mv build /mnt-output/documentation/
cd ..
rm -rf slate-bdb693031027c2e5af77cb709cb86836c3e2e74c
rm slate.zip
