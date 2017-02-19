#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIR_BUILD=$DIR/../.build

# Assuming you deployed with a 'serverless deploy | tee deploy.out' this script
# will auto fill in the TODOS_ENDPOINT environment variable

node $DIR/getEndpoint.js > $DIR_BUILD/endpoint.out
value=`cat $DIR_BUILD/endpoint.out`
export TODOS_ENDPOINT=$value

echo $TODOS_ENDPOINT
