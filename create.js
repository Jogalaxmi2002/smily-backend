import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
// if not then set AWS.config.update({ region: "us-east-1" });
//export async function main(event, context) {}
export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "notes",//if not then set the "notes"process.env.tableName
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from the request body
      attachment: data.attachment, // Parsed from the request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  await dynamoDb.put(params);
  return params.Item;
});