import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosSqlHelper } from "../Dal/CosmosSqlHelper";
import { CosmosClient, SqlQuerySpec, Items } from "@azure/cosmos";
import { Person } from "../Dto/person";

let helper: CosmosSqlHelper;
let client: CosmosClient;


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    helper = new CosmosSqlHelper();
    client = await helper.getClient();

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

//#region GET
const getOne = async (id: any): Promise<any> => {
    console.log('gettingOne');
    const querySpec: SqlQuerySpec = {
        query: "SELECT VALUE r.people FROM root r WHERE r.id = @id",
        parameters: [
            {
                name: "@id",
                value: `${id}`
            }
        ]
    };

    const { result: results } = await client
        .database(helper.databaseId)
        .container(helper.containerId)
        .items
        .query(querySpec, { enableCrossPartitionQuery: true }).toArray();

    console.log(JSON.stringify(results, null, 2));

    return id;
}

const getMany = async (req: any): Promise<any> => {
    console.log('gettingMany');
    const querySpec: SqlQuerySpec = {
        query: "",
        parameters: [
            {
                name: "",
                value: ""
            }
        ]
    };

    const { result: results } = await client
        .database(helper.databaseId)
        .container(helper.containerId)
        .items
        .query(querySpec, { enableCrossPartitionQuery: true }).toArray();
     
    console.log(JSON.stringify(results, null, 2));
     
    return req;
}
//#endregion

//#region POST
const insertOne = async (req, id): Promise<any> => {
    console.log('insertingOne');
    let person = new Person();
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    const item = await client
        .database(helper.containerId)
        .container(helper.containerId)
        .items
        .upsert(person);

    console.log(JSON.stringify(item, null, 2));
    
    return id;
}
//#endregion

//#region PATCH
const updateOne = async (req, id): Promise<any> => {
    console.log('updatingOne');
    let person = new Person();
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    const { item } = await client
        .database(helper.containerId)
        .container(helper.containerId)
        .item(id)
        .replace(person);

    console.log(JSON.stringify(item, null, 2));
    
    return req;
}
//#endregion

//#region DELETE
const deleteOne = async (id): Promise<any> => {
    console.log('deleteOne');
    const { item } = await client
        .database(helper.databaseId)
        .container(helper.containerId)
        .item(id)
        .delete();

    console.log(JSON.stringify(item, null, 2));    
    
    return id;
}
//#endregion

export default httpTrigger;
