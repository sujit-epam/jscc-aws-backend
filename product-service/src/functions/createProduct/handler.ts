import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// import mockProducts from './products.json';

import schema from './schema';
import { createProduct } from '../../service/products-service';
import { API_STATUS_CODES } from 'src/utils/const';
import { isValidUser } from 'src/utils/utilFunctions';

const createProductReq: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(`CreateProduct API called with request body::${JSON.stringify(event.body)}`)
  if (isValidUser(event.body)) {
    await createProduct(event.body);
    return formatJSONResponse({
      message: 'Created Product successfully'
    });
  }
  return formatJSONResponse({
    message: `Cannot create product. Invalid request:: ${JSON.stringify(event.body)}`
  }, API_STATUS_CODES.INVALID_REQUEST);
};

export const main = middyfy(createProductReq);
