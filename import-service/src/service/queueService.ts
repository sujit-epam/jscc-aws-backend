import { SQS } from "aws-sdk";

const sqs = new SQS({});
export function notifyProduct(product: unknown) {
    sqs
      .sendMessage({
        QueueUrl: process.env.UPLOAD_PRODUCTS_QUEUE,
        MessageBody: JSON.stringify(product),
      })
      .promise();
    return;
  }