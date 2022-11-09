import type { AWS } from '@serverless/typescript';

import { hello, createProduct, catalogBatchProcess } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'BATCH_PRODUCTS_UPLOAD_Q',
          VisibilityTimeout: 300,
          MessageRetentionPeriod: 86400
        }
      },
      ProductsUploadTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "uploaded-products"
        }
      },
      ProductsUploadEmailSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "sujit510@gmail.com",
          Protocol: "email",
          TopicArn: "arn:aws:sns:us-east-1:633521163208:ProductsUploadTopic"
        }
      },
    }
  },
  // import the function via paths
  functions: { hello, createProduct, catalogBatchProcess },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
