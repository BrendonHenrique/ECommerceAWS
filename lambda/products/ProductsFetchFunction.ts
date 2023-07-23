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

  const method = event.httpMethod;

  if (event.resource === "/products") {
    if (method === "GET") {
      console.log("GET");

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "GET Producuts - OK",
        }),
      };
    }
  } else if (event.resource === "/products/{id}") {
    const id = event.pathParameters?.id as string;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `GET /products/${id} - OK`,
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Bad Reqiest",
    }),
  };
}
