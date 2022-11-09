import { SNS } from "aws-sdk";

const sns = new SNS();
export async function sendEmailForNewProduct(product) {
    await sns
      .publish({
        TopicArn: this.env.PRODUCT_IMPORTED_TOPIC,
        MessageAttributes: {
          price: {
            DataType: "Number",
            StringValue: product.price.toString(),
          },
        },
        Subject: "New Product added through upload",
        Message: `A new product ${product.title} has been added through file upload.`,
      })
      .promise();
  }