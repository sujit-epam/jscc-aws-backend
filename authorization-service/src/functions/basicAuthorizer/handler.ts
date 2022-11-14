import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PERMISSIONS } from 'src/utils/const';
import { getPolicy, getTokenForUserCreds } from 'src/utils/utilFunctions';

import schema from './schema';

const basicAuthorizer: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {
  // return formatJSONResponse({
  //   message: `basicAuthorizer ${event.body.name}, welcome to the exciting Serverless world!`,
  //   event,
  // });
  const {authToken = '', methodArn} = event;
  if (event.type !== 'TOKEN') {
    return getPolicy(authToken, methodArn, PERMISSIONS.DENY);
  }
  try {
    const creds = getTokenForUserCreds(authToken);
    const password = process.env[creds.username];
    const permission = password === creds.password ? PERMISSIONS.ALLOW : PERMISSIONS.DENY;

    return getPolicy(authToken, methodArn, permission);
  } catch(error) {
    return getPolicy(authToken, methodArn, PERMISSIONS.DENY);
  }
};

export const main = middyfy(basicAuthorizer);
