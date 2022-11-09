### Task-6

1. Task 6.1
Created a lambda function called catalogBatchProcess which will be triggered by an SQS event.
Created an SQS queue called catalogItemsQueue, in the resources section of the same serverless.ts file.
Configured the SQS to trigger lambda catalogBatchProcess with 5 messages at once via batchSize property.
The lambda function iterates over all SQS messages and creates corresponding products in the products table.

2. Task 6.2
Updated the importFileParser lambda function in the Import Service to send each CSV record into SQS.
It no longer logs entries from the readable stream to CloudWatch.

3. Task 6.3
Created an SNS topic createProductTopic and email subscription in the resources section in serverless.yml of the Product Service.
Created a subscription for this SNS topic with an email endpoint type with my own email in there.
Updated the catalogBatchProcess lambda function in the Product Service to send an event to the SNS topic once it creates products.


