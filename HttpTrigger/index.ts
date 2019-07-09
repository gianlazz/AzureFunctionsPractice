import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosSqlHelper } from "../Dal/CosmosSqlHelper";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const client = new CosmosSqlHelper().getClient();

    const id = req.params ? req.params.id : undefined;
    
    switch (req.method) {
        case "GET":
            context.res.body = id ? await getOne(id) : await getMany(req);
            console.log(`Returned object ${id}`);
            context.log(`Returned object ${id}`);
            break;
        case "POST":
            context.res.body = await insertOne(req, id);
            console.log(`Inserted object ${id}`);
            context.log(`Inserted object ${id}`);
            break;
        case "PATCH":
            context.res.body = await updateOne(req, id);
            console.log(`Updated object ${id}`);
            context.log(`Updated object ${id}`);
            break;
        case "DELETE":
            context.res.body = await deleteOne(id);
            console.log(`Deleted object ${id}`);
            context.log(`Deleted object ${id}`);
        default:
            context.res.body = {
                status: 400,
                body: {
                    error: {
                        type: 'not_supported',
                        message: `Method ${req.method} not supported.`
                    }
                }
            };
            console.log(`Returned Error 400`);
            context.log(`Returned Error 400`);
    }
};

const getOne = async (id: any): Promise<any> => {
    console.log('gettingOne');
    console.log('gettingOne');
    return id;
}

const getMany = async (req: any): Promise<any> => {
    console.log('gettingMany');
    return req;
}

const insertOne = async (req, id): Promise<any> => {
    console.log('insertingOne');
    return id;
}

const updateOne = async (req, id): Promise<any> => {
    console.log('updatingOne');
    return req;
}

const deleteOne = async (id): Promise<any> => {
    console.log('deleteOne');
    return id;
}

export default httpTrigger;
