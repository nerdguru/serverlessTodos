# Local Execution

This page describes how to utilize the additional Mocha tests locally.

## Clone

First, clone this repo:

```bash
$ > git clone https://github.com/nerdguru/serverlessTodos.git
```

## Deploy

Like in the example it is based on, in order to deploy your endpoint simply run the `deploy` npm task.

```bash
$ > npm run deploy # task runs 'serverless deploy | tee deploy.out'
```

The pipe to `tee` will enable easier setting of an environment variable later and the expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
Serverless: Stack update finished…

Service Information
service: serverless-rest-api-with-dynamodb
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
  PUT - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
  DELETE - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
functions:
  serverless-rest-api-with-dynamodb-dev-update: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-update
  serverless-rest-api-with-dynamodb-dev-get: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-get
  serverless-rest-api-with-dynamodb-dev-list: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-list
  serverless-rest-api-with-dynamodb-dev-create: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-create
  serverless-rest-api-with-dynamodb-dev-delete: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-delete
```

## Usage

You can create, retrieve, update, or delete todos with the same `curl` commands as the [Serverless Framework ToDo example](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb).

## Run Tests

Before you can run tests, you need to set the `TODOS_ENDPOINT` environment variable to the value of the domain name returned when you deployed your service. Using values from the example above:

```bash
$ > export TODOS_ENDPOINT=45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev
$ > npm test
```

Or run `npm run test:remote` to do this automatically. The results are the same, and should look similar to:

```bash
Create, Delete
  ✓ should create a new Todo, & delete it (1938ms)

Create, List, Delete
  ✓ should create a new Todo, list it, & delete it (2859ms)

Create, Read, Delete
  ✓ should create a new Todo, read it, & delete it (2663ms)

Create, Update, Delete
  ✓ should create a new Todo, update it, verify the update, & delete it (2559ms)


4 passing (10s)
```
