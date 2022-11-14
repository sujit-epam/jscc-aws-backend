import { APIGatewayAuthorizerResult } from "aws-lambda";
import { PERMISSIONS } from "./const";

export function getTokenForUserCreds(tokenString) {
    const token = tokenString.split(' ')[1];
    const [username, password] = Buffer.from(token, 'base64')
        .toString('utf-8').split(':');
  
    return {
      username, 
      password
    }
  }
  
export function getPolicy(
    principalId,
    resource,
    effect = PERMISSIONS.ALLOW
): APIGatewayAuthorizerResult {
    return {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource,
          },
        ]
      }
    }
  }