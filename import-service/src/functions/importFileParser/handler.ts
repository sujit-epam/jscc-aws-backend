import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const csv = require('csv-parser');
import * as AWS from 'aws-sdk';
const BUCKET_NAME = 'uploaded-jscc';

import schema from './schema';

const importFileParser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('inside importFileParser...');
  const s3 = new AWS.S3({ region: 'us-east-1'});
  let statusCode = 200;
  let body = {};
  
  const params = {
    Bucket: BUCKET_NAME,
    Prefix: 'uploaded/',
    Expires: 60,
    ContentType: 'text/csv'
  };

  try {
    const s3Response = await s3.listObjectsV2(params).promise();
    const csvFiles = (s3Response.Contents ??[]).filter(file => file.Size);
    console.log('csvFiles length...', csvFiles.length);
    for (const file of csvFiles) {
      const paramsForFile = {
        Bucket: BUCKET_NAME,
        Key: `uploaded/${file.Key}`,
      };
      const s3Stream = s3.getObject(paramsForFile).createReadStream();
      s3Stream
        .pipe(csv())
        .on('data', (data) => {
          console.log('data::', data)
        })
        .on('error', (err) => {
          console.log('ERROR::', err)
        })
        .on('end', () => {
          console.log('READING COMPLETED!!')
        });
    }
    // body = JSON.stringify(
    //   thumbnails
    //     .filter(thumbnail => thumbnail.Size)
    //     .map(thumbnail => `https://${BUCKET_NAME}.s3.amazonaws.com/${thumbnail.Key}`)
    // )
  } catch(err) {
    console.error('Error appears:');
    console.error(err);
    statusCode = 500;
    body = err;
  }
  return formatJSONResponse({
    statusCode,
    body,
    event,
  });
};

export const main = middyfy(importFileParser);