import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event?.body?.name}, welcome to the exciting Serverless world!`,
    message2: `Hello q ${event?.queryStringParameters?.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
