node getEndpoint.js > endpoint.out
value=`cat endpoint.out`
echo $value
export TODOS_ENDPOINT=$value
npm test