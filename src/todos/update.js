'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.text !== 'string' && typeof data.checked !== 'boolean') {
    console.error('Validation Failed'); // eslint-disable-line no-console
    callback(new Error('Couldn\'t create the todo item.'));
    return;
  }

  const params = {
	// PCJ: Minor change from original, use environment variable for stage sensitive table name
    TableName: process.env.TABLE_NAME,
    Item: {
      id: event.pathParameters.id,
      text: data.text,
      checked: data.checked,
      updatedAt: timestamp,
    },
  };

  // update the todo in the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error); // eslint-disable-line no-console
      callback(new Error('Couldn\'t update the todo item.'));
      return;
    }

    // create a resonse
    const response = {
      statusCode: 200,
      	// PCJ: Minor change from original, return full item inserted instead of empty result
		// body: JSON.stringify(result.Item),
		body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
