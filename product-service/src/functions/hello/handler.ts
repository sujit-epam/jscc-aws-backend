import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// import mockProducts from './products.json';

import schema from './schema';
import { getAllProductsWithCount, getProductWithCount } from '../../service/products-service';
import { API_STATUS_CODES } from 'src/utils/const';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let products = [];
  try {
    if (event.pathParameters && event.pathParameters.id) {
      console.log(`getProduct API called with id:: ${event.pathParameters.id}`);
      products = await getProductWithCount(event.pathParameters.id);
      if (!products.length) {
        return formatJSONResponse({
          message: `Product with specified id ${event.pathParameters.id} not found`
        }, API_STATUS_CODES.NOT_FOUND);
      }
    } else {
      console.log(`getProducts List API called`);
      products = await getAllProductsWithCount();
    }
  } catch(err) {
    return formatJSONResponse({
      message: 'Some error occurred.'
    }, API_STATUS_CODES.SERVER_ERROR);
  }
  return formatJSONResponse(products as any);
};

export const main = middyfy(hello);
