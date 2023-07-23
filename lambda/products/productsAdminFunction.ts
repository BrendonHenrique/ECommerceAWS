import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const lambdaRequestId = context.awsRequestId;
  const apiRequestId = event.requestContext.requestId;

  console.log({
    lambdaRequestId,
    apiRequestId,
  });

  if (event.resource === "/products") {
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "POST Producuts - OK",
      }),
    };
  } else if (event.resource === "/products/{id}") {
    const productId = event.pathParameters!.id as string;
    if (event.httpMethod === "PUT") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `PUT /Producuts/${productId} - OK`,
        }),
      };
    } else if (event.httpMethod === "DELETE") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `DELETE /Producuts/${productId} - OK`,
        }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Bad Reqiest",
    }),
  };
}
