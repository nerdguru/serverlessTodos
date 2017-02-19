#!/bin/bash

# Assuming you deployed with a 'serverless deploy | tee deploy.out' this script
# will auto fill in the TODOS_ENDPOINT environment variable

node helpers/getEndpoint.js > .build/endpoint.out
export TODOS_ENDPOINT=`cat .build/endpoint.out`

echo $TODOS_ENDPOINT
