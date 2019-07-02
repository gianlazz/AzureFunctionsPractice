## Azure Functions Serverless Typescript Practice

## Table of Contents:
- [Getting Started](#getting-started)
- [Typescript Setup](#typescript-setup)

## Getting Started

- https://code.visualstudio.com/tutorials/functions-extension/getting-started
- https://code.visualstudio.com/tutorials/functions-extension/create-app
- https://code.visualstudio.com/tutorials/functions-extension/create-function

## Typescript Setup
The azure functions vscode extension now supports Typescript as one of the project templates to choose from when initializing a new function.
- https://azure.microsoft.com/en-us/blog/improving-the-typescript-support-in-azure-functions/

For more examples of the kind of boilerplate it will create you can check out this repository mentioned in the link above:
- https://github.com/mhoeger/typescript-azure-functions

## Postman Testing
- https://www.getpostman.com/downloads/

In the request body of postman change from text to JSON (application/json) ans send the following body.
This works with POST and GET requests.

```JSON
{
    name: "Gian"
}
```