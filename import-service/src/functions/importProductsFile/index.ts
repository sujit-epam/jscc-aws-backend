// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: {
          name: 'basicAuthorizer',
          arn: 'arn:aws:lambda:us-east-1:963352116320:function:authorization-service-dev-basicAuthorizer',
          type: 'TOKEN',
          identitySource: 'method.request.header.Authorization', 
        },
      },
    },
  ],
};
