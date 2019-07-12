import { CosmosClient, PartitionKeyDefinition, Database } from "@azure/cosmos";


const getClient = (): CosmosClient => {
    const endpoint = process.env['COSMOS_SQL_ENDPOINT']
    if (!endpoint) {
        throw Error('COSMOS_SQL_ENDPOINT environment variable not found.');
    }
    const masterKey = process.env['COSMOS_SQL_MASTERKEY']
    if (!masterKey) {
        throw Error('COSMOS_SQL_MASTERKEY environment variable not found.');
    }

    const client = new CosmosClient({
        endpoint: endpoint, 
        auth: { 
            masterKey: masterKey 
        }
    });
    return client;
}

const getDatabase = (databaseId: string): Database => {
    try {
        const client = getClient();
        const database = client.database(databaseId); 
        return database;     
    } catch (error) {
        
    }
};

const createDatabase = async (databaseId: string) => {
    try {
        const client = getClient();
        const database = await client.databases.createIfNotExists({id: databaseId });
        console.log(`Created database: ${databaseId}`);   
    } catch (error) {
        throw Error(error);
    }
};


const readDatabase = async (databaseId: string) => {
    try {
        const client = getClient();
        const definition = await client.database(databaseId).read();
        console.log(`Reading database: ${definition.database.id}`);
    } catch (error) {
        throw Error(error);   
    }
};

const createContainer = async (databaseId: string, containerId: string) => {
    try {
        const client = getClient();
        const result = await client.database(databaseId).containers.createIfNotExists(
            { 
                id: containerId, 
                // partitionKey: this.partitionKey
            }, 
            { 
                offerThroughput: 400 
            });
        console.log(`Created container: ${result.container.id}`);   
    } catch (error) {
        throw Error(error);
    }
};

const readContainer = async (databaseId: string, containerId: string) => {
    try {
        const client = getClient();
        const result = await client.database(databaseId).container(containerId).read();
        console.log(`Reading container ${result.body.id}`);   
    } catch (error) {
        throw Error(error);
    }
};

const cleanup = async (databaseId: string) => {
    try {
        const client = getClient();
        await client.database(databaseId).delete();
    } catch (error) {
        
    }
}