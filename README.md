# cape-frontend
This package provides a management UI for Cape and the API documentation.

Frontend demo is [here](http://bloomsbury.ai/landing.html) (only works if you already launched a Backend).


## Modifying the frontend

To make changes to the frontend (mainly done with node.js and vue.js) :
   * Make your changes in `/deployment/source` directory
   * Download the image to build the frontend : `docker pull bloomsburyai/npm-cape-frontend`
   * Build the modified frontend by running the image and mounting the input and output folders from the docker host :
     `docker run --rm -ti -v $(pwd)/deployment:/mnt-input/ $(pwd)/cape_frontend/static:/mnt-output/ bloomsburyai/npm-cape-frontend`


