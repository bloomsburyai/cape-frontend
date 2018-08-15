#
#------- Build an image to rebuild the frontend ---------
#
FROM ubuntu:16.04

RUN apt-get -y update &&\
    apt-get install -y software-properties-common git curl bzip2 htop wget\
        unzip ruby-full build-essential g++ libcurl4-openssl-dev curl locales zlib1g-dev

WORKDIR /code
ENV NVM_DIR /usr/local/nvm
ENV PATH $NVM_DIR/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH # Install nvm and default node version.
ADD deployment/source/.nvmrc /code/.nvmrc
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash && \
    echo 'source $NVM_DIR/nvm.sh' >> /etc/profile && \
    /bin/bash -l -c "nvm install;" \
    "nvm use"

ADD deployment/buidFrontend.sh /code/buidFrontend.sh
ADD deployment/source /mnt-input/source
ADD deployment/api_documentation /mnt-input/api_documentation
ADD cape_frontend/static /mnt-output
RUN /code/buidFrontend.sh

#Build the image:
#docker build --tag bloomsburyai/npm-cape-frontend --file deployment/Dockerfile --rm=true .
#Or download the image :
#docker pull bloomsburyai/npm-cape-frontend
#To rebuild the frontend run this image by mounting the input and output folders from the host :
#docker run --rm -ti -v $(pwd)/deployment:/mnt-input/ -v $(pwd)/cape_frontend/static:/mnt-output/ bloomsburyai/npm-cape-frontend
ENTRYPOINT ["/code/buidFrontend.sh"]
