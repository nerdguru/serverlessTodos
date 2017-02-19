# Assuming you deployed with a 'serverless deploy | tee deploy.out' this script will auto fill in the TODOS_ENDPOINT environment variable and execute your tests
node getEndpoint.js > endpoint.out
value=`cat endpoint.out`
echo "Here's the endpoint: " $value
export TODOS_ENDPOINT=$value
npm test
