import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosSqlHelper } from "../common/dal/cosmosSqlHelper";
import { Person } from "../common/dto/person";

let helper: CosmosSqlHelper;
let client: CosmosClient;


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    helper = new CosmosSqlHelper();
    client = await helper.getClient();

    // const id = req.params ? req.params.id : undefined;
    const id = (req.query.id || (req.body && req.body.id));
    
    switch (req.method) {
        case "GET":
            context.res.body = id ? await getOne(id) : await getMany(req);
            console.log(`Returned object ${id}`);
            context.log(`Returned object ${id}`);
            break;
        case "POST":
            context.res.body = await insertOne(req);
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
            break;
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
        query: "SELECT * FROM root r WHERE r.id = @id",
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
        
    if (results.length === 1) {
        const result = results[0];
        let person = new Person(result);

        return person;
    }
}

const getMany = async (req: any): Promise<any> => {
    console.log('gettingMany');

    const ids = req.body.ids as string[];
    // Checks that body type is valid
    if (!Array.isArray(ids) || ids == undefined) 
        throw Error('Body should be an object with an ids field of type array.')

    let query = "SELECT * FROM root r WHERE r.id IN ";
    for (let i = 0; i < ids.length; i++) {
        const element = ids[i];
        // Checks that element is a string
        if (typeof element !== 'string')
            throw Error('Each element in ids array should be a string');

        if (i == 0) {
            // Beginning of array
            query += `('${element}', `;
        } else if (i == ids.length - 1) {
            // End of array
            query += `'${element}')`
        } else {
            // Middle of array
            query += `'${element}', `
        }
    }

    const querySpec: SqlQuerySpec = {
        query: query
    };

    const { result: results } = await client
        .database(helper.databaseId)
        .container(helper.containerId)
        .items
        .query(querySpec, { enableCrossPartitionQuery: true }).toArray();


    for (let index = 0; index < results.length; index++) {
        results[index] = new Person(results[index]);
    }
     
    return results;
}
//#endregion

//#region POST
const insertOne = async (req): Promise<any> => {
    console.log('insertingOne');
    let person = req.body as Person;
    const item = await client
        .database(helper.databaseId)
        .container(helper.containerId)
        .items
        .upsert(person);
    
    return person.id;
}
//#endregion

//#region PATCH
const updateOne = async (req, id): Promise<any> => {
    console.log('updatingOne');
    let person = new Person(req.body);
    const { item } = await client
        .database(helper.databaseId)
        .container(helper.containerId)
        .item(id)
        .replace(person);

    person = new Person(item);
    console.log(JSON.stringify(person, null, 2));
    
    return person;
}
//#endregion

//#region DELETE
const deleteOne = async (id): Promise<any> => {
    console.log('deleteOne');
    try {
        const item = await client
        .database(helper.databaseId)
        .container(helper.containerId)
        .item(id)
        .delete();
    } catch (error) {
        throw Error(error);
    }

    
    return id;
}
//#endregion

export default httpTrigger;
