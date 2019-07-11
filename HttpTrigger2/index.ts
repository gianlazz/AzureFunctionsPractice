import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AuthService } from "../common/services/authService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const authService = new AuthService();
    const user = authService.extractUser(req);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Hello " + (JSON.stringify(user, null, 2)) + " this is function2."
    };
    
};

export default httpTrigger;
