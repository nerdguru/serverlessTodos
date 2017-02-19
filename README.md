# Extending a Serverless REST API example

This project riffs off of the [Serverless Framework Todo example](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb), which demonstrates how to to create, list, get, update and delete Todos. DynamoDB is used to store the data.

## What's Different?

This project extends the Serverless Framework example by adding:

* [Mocha](https://mochajs.org/) tests
* CI/CD using [AWS CodePipeline](https://aws.amazon.com/codepipeline/)


## Setup

First, [follow the setup instructions for the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/), then install needed NPM packages.

```bash
$ > npm install
```

## Modes of Execution

First, look at [local execution](docs/local.md) for how to run tests in your local environment. Then, look at [CodePipeline execution](docs/codePipeline.md) for how to run tests as part of a CI/CD pipeline using AWS CodePipeline.
