import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const basicAuthorizer: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `basicAuthorizer ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(basicAuthorizer);
