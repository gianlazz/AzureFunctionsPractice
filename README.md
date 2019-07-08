# Azure Functions Serverless Typescript Practice

## Table of Contents:
- [Getting Started](#getting-started)
- [Typescript Setup](#typescript-setup)
- [Postman Testing](#postman-testing)
- [Deploying](#deploying)
- [Routing](#routing)
- [Authentication](#authentication)
- [Azure CosmosDB](#azure-cosmosdb)
- [CICD](#cicd)

## Examples Illustrated
- [ ] Multi endpoint azure function REST
- [ ] Azure Active Directory Authentication With OAuth
- [ ] ARM Template Deployment
- [ ] Azure CosmosDB Persistence For CRUD Operations From REST API

## Getting Started

- https://code.visualstudio.com/tutorials/functions-extension/getting-started
- https://code.visualstudio.com/tutorials/functions-extension/create-app
- https://code.visualstudio.com/tutorials/functions-extension/create-function

- Install VSCode Azure Functions Extension
- Install Azure Resource Manager Tools VSCode Extension
- Also install the azure cli
    - https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest
    - Run `az login`
    - Select your subscription `az account set --subscription <name or id>`

Outdated Typescript setup but still helpful:
- https://medium.com/@amr.farid140/awesome-typescript-azure-functions-part-1-project-setup-1f5950e7a704
Outdated Typescript boilerplate with mongoose for mongodb:
- https://github.com/azure-seed/azure-functions-mongooser
Other resources:
- https://medium.com/burak-tasci/backend-development-on-azure-functions-with-typescript-56113b6be4b9
- https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook#trigger---configuration

### GraphQL Support
- https://www.apollographql.com/docs/apollo-server/v1/servers/azure-functions/
- https://www.apollographql.com/docs/apollo-server/deployment/azure-functions/
- https://www.linkedin.com/pulse/azure-function-graphql-cosmos-db-serverless-goodness-lee/

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

## Deploying

- https://code.visualstudio.com/tutorials/functions-extension/deploy-app

Azure Resource Explorer(ARM) Templates
- https://peteskelly.com/deploy-an-azure-function-app-using-azure-arm-templates/
- [(YouTube) Best practices Using Azure Resource Manager (ARM) Templates](https://www.youtube.com/watch?v=myYTGsONrn0)
Find the generated ARM Template for an existing resource group:
    - Open Azure Portal
    - Open Resource Groups and select the one you want
    - On the left select "Export template"
    - Wait for it to generate and click the download button on the top
    - Paste contents in this repository
    - CD into the new directory
    - Run the following to validate:
```
az group deployment validate --resource-group azurefunctionspractice --template-file ./template.json --parameters ./parameters.json
```

## Routing
- https://www.serverlessnotes.com/docs/http-routing-with-azure-functions
- https://stackoverflow.com/questions/48305132/custom-routing-in-azure-functions-using-httptrigger-attribute
- https://jonathangiles.net/creating-custom-routes-in-azure-functions/
- https://www.codeproject.com/Articles/1275414/Azure-Functions-2-0-HTTP-Routing-Options

- https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook#customize-the-http-endpoint

## Authentication

- https://www.npmjs.com/package/azure-functions-auth
- https://azure.microsoft.com/en-us/resources/samples/active-directory-node-webapp-openidconnect/?cdn=disable
- [Identity and secure resource access in App Service and Azure Functions - Matthew Henderson](https://www.youtube.com/watch?v=iFDXDQXRJ8Y)

- https://peteskelly.com/secure-functions-aad-2/

## Azure CosmosDB
- https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb

## CICD
- https://github.com/azure-seed/azure-functions-typescript/blob/master/.circleci/config.yml
