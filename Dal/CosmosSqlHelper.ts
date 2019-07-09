import { CosmosClient, PartitionKeyDefinition } from "@azure/cosmos";

export class CosmosSqlHelper {
    
    endpoint = "";
    masterKey = "";
    databaseId = "";
    containerId = "";
    partitionKey = { kind: "Hash", paths: ["/Country"] } as PartitionKeyDefinition;

    client: CosmosClient;
    startupPromise: Promise<any>;

    constructor() {
        this.getClient();
        this.startupPromise = this.createDatabase()
        .then(() => this.readDatabase())
        .then(() => this.createContainer())
        .then(() => this.readContainer())
        .then(() => { status: `Completed successfully` })
        .catch((error) => { status: `Completed with error ${JSON.stringify(error)}` });
    }

    async getClient(): Promise<CosmosClient> {
        if (!this.client) {
            this.client = new CosmosClient(
                { 
                    endpoint: this.endpoint, 
                    auth: { 
                        masterKey: this.masterKey 
                    }
                });
        }
        console.log('Awaiting db initialization');
        await this.startupPromise;
        console.log('DB Ready');

        return this.client;
    }

    async createDatabase() {
        const database = await this.client.databases.createIfNotExists({id: this.databaseId });
        console.log(`Created database: ${this.databaseId}`);
    }

    async readDatabase() {
        const definition = await this.client.database(this.databaseId).read();
        console.log(`Reading database: ${definition.database.id}`);
    }

    async createContainer() {
        const result = await this.client.database(this.databaseId).containers.createIfNotExists(
            { 
                id: this.containerId, 
                partitionKey: this.partitionKey
            }, 
            { 
                offerThroughput: 400 
            });
        console.log(`Created container: ${result.container.id}`);
    }

    async readContainer() {
        const result = await this.client.database(this.databaseId).container(this.containerId).read();
        console.log(`Reading container ${result.body.id}`);
    }

}