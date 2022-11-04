import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
const BUCKET_NAME = 'uploaded-jscc';

import schema from './schema';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const s3 = new AWS.S3({ region: 'us-east-1'});
  let statusCode = 200;
  let body = {};
  const catalogPath = `uploaded/${event?.queryStringParameters?.name}`;
  const params = {
    Bucket: BUCKET_NAME,
    // Prefix: 'uploaded/'
    Key: catalogPath,
    Expires: 60,
    ContentType: 'text/csv'
  };
  let s3Response;

  try {
    const url = s3.getSignedUrl('putObject', params);

    // statusCode = error ? 500 : statusCode;
      return formatJSONResponse(url, statusCode)
  } catch(err) {
    console.error('Error appears:');
    console.error(err);
    statusCode = 500;
    body = err;
  }
  return formatJSONResponse({
    statusCode,
    body,
    s3Response,
    event,
  });
};

export const main = middyfy(importProductsFile);
