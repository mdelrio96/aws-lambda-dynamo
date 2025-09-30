const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = 'ItemsTable';

exports.handler = async (event) => {
    const method = event.requestContext.http.method;
    if (method === 'POST') {
        const item = JSON.parse(atob(event.body));
        await dynamo.put({ TableName: tableName, Item: item }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: Item creado exitosamente' })
            };
        } else if (method === 'GET') {
            const itemId = event.queryStringParameters.id;
            const result = await dynamo.get({ TableName: tableName, Key: { ItemId: itemId } }).promise();
            if (result.Item) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(result.Item)
                };
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: Item no encontrado' })
                    };
                }
            } else if (method === 'DELETE') {
                const itemId = event.queryStringParameters.id;
                await dynamo.delete({ TableName: tableName, Key: { ItemId: itemId } }).promise();
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Item eliminado exitosamente' })
                };
            }
        };
