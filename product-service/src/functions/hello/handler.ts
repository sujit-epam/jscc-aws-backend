import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import mockProducts from './products.json';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let products = [];
  if (event.pathParameters && event.pathParameters.id) {
    products = mockProducts.filter(({ id }) => id === event.pathParameters.id);
  } else {
    products = mockProducts
  }
  return formatJSONResponse({
    products,
    // message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
