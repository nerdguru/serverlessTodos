# Assuming you deployed with a 'serverless deploy | tee deploy.out' this script will auto fill in the TODOS_ENDPOINT environment variable
node getEndpoint.js > endpoint.out
value=`cat endpoint.out`
echo $value
export TODOS_ENDPOINT=$value