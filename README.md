# Azure Functions Serverless Typescript Practice

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

## Examples Illustrated
- [x] Multi endpoint azure function REST
- [x] Azure Active Directory Authentication With OAuth
- [x] Azure CosmosDB Persistence For CRUD Operations From REST API
- [x] ARM Template Deployment
- [ ] GitHub Build/Deployment Hook

## Table of Contents:
- [Typescript Functions App QuickStart](#typescript-functions-app-quickstart)
- [Authentication](#authentication)
- [Azure CosmosDB](#azure-cosmosdb)
- [Deploying](#deploying)
- [Testing](#postman-testing)
- [Logging](#logging)

## Deploy To Azure QuickStart
- Click Deploy to Azure button
- Enter the name for your app
- Enter 'aadClientId' & 'aadTenant'
    - These details must be gotten from the azure portal
    - Go to Azure Active Directory in Azure Portal
    - Select App registrations under the Manage section on the side
    - Select an existing app or select New registration
    - After that copy the APPLICATION (CLIENT) ID, this will be your 'aadClientId'
    - Select Properties under the Manage section on the side
    - Copy Directory ID value, this will look like 13118708-99c4-4f22-9dfd-c588c56e2785 and be your 'aadTenant'

## Typescript Functions App QuickStart

Setup Dependencies:
- Install VSCode Azure Functions Extension
- Install Azure Resource Manager Tools VSCode Extension
- Also install the azure cli
    - https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest
    - Run `az login`
    - Select your subscription `az account set --subscription <name or id>`

Create TypeScript Functions App:
- Open VSCode
    - Open Azure Extension
    - Open Functions Section
    - Click Create New Project Icon
    - Select the folder you're working in
    - Select TypeScript
    - Add & then name an HTTP Trigger it that's what you like or select Skip for now
- Add A Function
    - Open VSCode
    - Open Azure Extension
    - Open Functions Section
    - Click the Create New Function icon
    - Select function type and name it
 
You can continue adding as many functions as you need to the one Azure Functions App you've created in your folder with VSCode.

Resources Used:
- https://code.visualstudio.com/tutorials/functions-extension/getting-started
- https://code.visualstudio.com/tutorials/functions-extension/create-app
- https://code.visualstudio.com/tutorials/functions-extension/create-function
- https://azure.microsoft.com/en-us/blog/improving-the-typescript-support-in-azure-functions/
- https://github.com/mhoeger/typescript-azure-functions
 
Other resources:
- https://medium.com/burak-tasci/backend-development-on-azure-functions-with-typescript-56113b6be4b9
- https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook#trigger---configuration

Outdated Typescript setup but still helpful:
- https://medium.com/@amr.farid140/awesome-typescript-azure-functions-part-1-project-setup-1f5950e7a704

Outdated Typescript boilerplate with mongoose for mongodb:
- https://github.com/azure-seed/azure-functions-mongooser

## Authentication

Setting Up Auth For Functions App
- Open Functions App In Portal
    - Click Platform Features
    - Click Authentication / Authorization under the networking section
    - Turn App Service Authentication On
    - Under "Action to take when request is not authenticated" Select Log in with Azure Active Directory
    - Under Authentication Providers click "Azure Active Directory"
    - Selected "Express" for Management mode
    - Select your Azure AD App you're working on in the portal if it's not already selected
    - Click OK
    - Click Save

![alt test](https://peteskelly.com/content/images/2017/09/config_aad-2.gif)

Then in an HttpTrigger you can extract user details out of the request header with the following code:
```TYPESCRIPT
    extractUser(req: HttpRequest): User {
        const user = {
            email: req.headers["x-ms-client-principal-name"],
            authProvider: req.headers["x-ms-client-principal-idp"],
            userAgent: req.headers["user-agent"],
            clientIp: req.headers["client-ip"],
        } as User;

        return user;
    }
```
This will return something that looks like this:
```JSON
{
  "email": "YOUR AUTHENTICATED EMAIL ADDRESS WOULD BE HERE",
  "authProvider": "aad",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
  "clientIp": "YOUR IP WOULD BE HERE"
}
```

Resources Referenced:
- https://docs.microsoft.com/en-us/azure/app-service/overview-authentication-authorization
- https://docs.microsoft.com/en-us/azure/app-service/configure-authentication-provider-aad
- https://peteskelly.com/secure-functions-aad-2/ 
- https://stackoverflow.com/questions/36576863/get-logged-in-user-with-azure-web-apps-auth

Auth Endpoints:
- https://azurefunctionspractice.azurewebsites.net/.auth/me
- https://azurefunctionspractice.azurewebsites.net/.auth/login/aad

Other Resources:
- https://www.npmjs.com/package/azure-functions-auth
- https://azure.microsoft.com/en-us/resources/samples/active-directory-node-webapp-openidconnect/
- [Identity and secure resource access in App Service and Azure Functions - Matthew Henderson](https://www.youtube.com/watch?v=iFDXDQXRJ8Y)

## Azure CosmosDB

**SQL API**
- https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-get-started
- https://docs.microsoft.com/en-us/azure/cosmos-db/sql-query-getting-started
- https://www.novatec-gmbh.de/en/blog/azure-documentdb-integration-with-node-js-using-typescript-and-repository-pattern/

**NOSQL API**

Resources Used:
- https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb
- https://www.npmjs.com/package/@azure/cosmos
- https://connectedstuff.io/2018/03/02/building-serverless-apis-with-typescript-and-azure-function-proxies-2/
- https://github.com/TsuyoshiUshio/TypeScriptCosmosSpike

Other Resources:
- https://blogs.msdn.microsoft.com/wushuai/2017/11/19/access-azure-cosmosdb-in-typescript/

## Settings And Environment Variables

During development environment variables are stored in the local.settings.json which is git ignored.

- https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#local-settings-file

During development these settings need to be added either through the azure portal or through the azure functions vscode extension.

They are then accessed like this:
```TYPESCRIPT
const endpoint = process.env['COSMOS_SQL_ENDPOINT']
```

## Deploying

- https://code.visualstudio.com/tutorials/functions-extension/deploy-app
- https://docs.microsoft.com/en-us/azure/azure-functions/functions-continuous-deployment
- https://github.com/Azure/Azure-Functions/wiki/Deploying-Function-Apps-vs-individual-Functions
    - https://azure.microsoft.com/en-us/resources/templates/

Azure Resource Explorer(ARM) Templates
- https://github.com/Azure/azure-quickstart-templates/tree/master/101-function-app-create-dynamic
- https://docs.microsoft.com/en-us/azure/templates/microsoft.web/2018-02-01/sites
- https://docs.microsoft.com/en-us/azure/templates/microsoft.documentdb/2015-04-08/databaseaccounts
- https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-quickstart-create-templates-use-visual-studio-code?tabs=CLI
    - https://shell.azure.com/
    - Enter the following into the azure shell after uploading the arm template for a quick start on deploying ARM Templates
    ```
    echo "Enter the Resource Group name:" &&
    read resourceGroupName &&
    echo "Enter the location (i.e. centralus):" &&
    read location &&
    az group create --name $resourceGroupName --location "$location" &&
    az group deployment create --resource-group $resourceGroupName --template-file "$HOME/azuredeploy.json"
    ```
ARM Template Auth Config:
- https://docs.microsoft.com/en-us/azure/templates/microsoft.web/2018-11-01/sites/config-authsettings
- https://stackoverflow.com/questions/45268658/easy-authentication-and-authorization-in-azure-function-app-using-arm-template
- https://stackoverflow.com/questions/54411480/arm-template-web-app-authentication-settings-not-working
- https://stackoverflow.com/questions/35846300/is-it-possible-to-script-the-configuration-of-azure-app-service-authentication
- https://stackoverflow.com/questions/51118555/automtically-create-app-service-identity-when-deploying-an-arm-template-for-app
- https://helpdesk.kaseya.com/hc/en-gb/articles/115002521251-How-Do-I-Find-My-Azure-AD-Tenant-Name-
- https://docs.microsoft.com/en-us/onedrive/find-your-office-365-tenant-id
- https://stackoverflow.com/questions/53635579/aadsts700054-response-type-id-token-is-not-enabled-for-the-application
- https://www.koskila.net/how-to-fix-aadsts500113-no-reply-address-is-registered-for-the-application-error/

More Resources Used:
- https://azure.microsoft.com/en-us/blog/deploy-to-azure-button-for-azure-websites-2/
- http://usergroup.tv/videos/using-azure-arm-templates-for-dev-and-test-environments
- https://stackoverflow.com/questions/41458346/arm-template-json-dynamic-connectionstring
- https://peteskelly.com/deploy-an-azure-function-app-using-azure-arm-templates/
- [(YouTube) Best practices Using Azure Resource Manager (ARM) Templates](https://www.youtube.com/watch?v=myYTGsONrn0)

## Testing

There are example tests for the RESTful CRUD operations. They can be run with the debugger. These are implemented with ts-jest to add TypeScript support to the jest testing library.

Run/Debug Tests:
Insure that you have your local.settings.json COSMOS_SQL_ENDPOINT & COSMOS_SQL_MASTERKEY configured to a deployed instance from the deployment script and then, with all vscode tasks killed run the vscode compound debug launch "Functions/Jest" to run and debug the tests.

![alt test](https://media.giphy.com/media/QsPgzcFhSlgPe44zJy/source.gif)

During development Postman was used to hit the endpoints.

- https://www.getpostman.com/downloads/

In the request body of postman change from text to JSON (application/json) ans send the following body.
This works with POST and GET requests.

```JSON
{
    name: "Gian"
}
```

## Logging

Resources Referenced:
- https://stackoverflow.com/questions/54831728/context-log-vs-console-log-in-azure-function-apps

