import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "appointment",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      appointmentId: event.pathParameters.id,
    },
    UpdateExpression: "SET #date = :date",
    ExpressionAttributeNames: {
      "#date": "date",
    },
    ExpressionAttributeValues: {
      ":date": data.date || null,
    },
    ReturnValues: "ALL_NEW",
  };
  await dynamoDb.update(params);
  return { status: true };
});
