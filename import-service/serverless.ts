import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
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
    // profile: 'quotes-app',
    lambdaHashingVersion: '20201221',
    stage: 'dev',
    iamRoleStatements: [
      {
        'Effect': 'Allow',
        'Action': ['s3:ListBucket'],
        'Resource': 'arn:aws:s3:::uploaded-jscc'
      },
      {
        'Effect': 'Allow',
        'Action': ['s3:*'],
        'Resource': 'arn:aws:s3:::uploaded-jscc/*'
      }
    ]
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'BATCH_PRODUCTS_UPLOAD_Q',
          VisibilityTimeout: 300,
          MessageRetentionPeriod: 86400,
        }
      },
    }
  },
  // import the function via paths
  functions: { hello, importProductsFile, importFileParser },
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
