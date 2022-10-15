const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

export const scan = async (tableName) => {
    const scanResults = await dynamo.scan({
        TableName: tableName
    }).promise();
    return scanResults.Items;
}

export const query = async (tableName, id, idKey = 'id') => {
    const queryResults = await dynamo.query({
        TableName: tableName,
        ...(id ? {
            KeyConditionExpression: `${idKey} = :${idKey}`,
            ExpressionAttributeValues: {[`:${idKey}`]: parseInt(id)}
        } : {})
    }).promise();
    return queryResults.Items;
}

export const put = async (tableName, item) => {
    const putResults = await dynamo.put({
        TableName: tableName,
        Item: item
    }).promise();
    return putResults.Items;
}
