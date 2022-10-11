// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        // request: {
        //   headers: {
        //     "Access-Control-Allow-Headers" : "Content-Type",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        //   },
        //   // schemas: {
        //   //   'application/json': schema,
        //   // },
        // },
      },
    },
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        cors: true,
        // request: {
        //   headers: {
        //     "Access-Control-Allow-Headers" : "Content-Type",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        //   },
          // schemas: {
          //   'application/json': schema,
          // },
        // },
      },
    },
  ],
};
