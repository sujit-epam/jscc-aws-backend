import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { createProduct } from '../../service/products-service';
import { API_STATUS_CODES } from 'src/utils/const';
import { SQSEvent } from 'aws-lambda';
import { sendEmailForNewProduct } from 'src/service/notify-service';

const createProductReq: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: SQSEvent
) => {
  const records = event.Records;
  try {
    await Promise.all(records.map(async (rec) => {
      const recordBody = JSON.parse(rec.body);
      const { title, description, price, count } = recordBody;
      const product = await createProduct({
        title,
        description,
        price,
        count,
      });
      console.log('created product:', product);
      await sendEmailForNewProduct(product);
      console.log('Sent mail for product:', product);
    }));
    return formatJSONResponse({
      message: 'Created Product successfully'
    });
  } catch(err) {
    console.log('Error while creating batch products::', err);
  }
  return formatJSONResponse({
    message: `Cannot create product. Invalid request:: ${JSON.stringify(event.body)}`
  }, API_STATUS_CODES.INVALID_REQUEST);
};

export const main = middyfy(createProductReq);
