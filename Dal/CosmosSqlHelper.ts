import { CosmosClient, PartitionKeyDefinition } from "@azure/cosmos";

export class CosmosSqlHelper {
    
    endpoint = "";
    masterKey = "";
    databaseId = "";
    containerId = "";
    partitionKey = { kind: "Hash", paths: ["/Country"] } as PartitionKeyDefinition;

    client: CosmosClient;
    initialized: boolean = false;

    constructor() {
        this.getClient();
    }

    async initialize(): Promise<void> {
        try {
            await this.createDatabase();
            await this.readDatabase();
            await this.createContainer();
            await this.readContainer();
            this.initialized = true;
            console.log('Completed initialization');
        } catch (error) {
            console.error(`Completed with error ${JSON.stringify(error)}`);
            throw Error(error);
        }
    }
    
    checkIfInitialized() {
        console.log('Waiting for DB Helper initialization process.');
        while (!this.initialized) {}
        console.log('DB Helper is initialized.')
    }
    
    async getClient(): Promise<CosmosClient> {
        try {
            if (!this.client) {
                this.client = new CosmosClient(
                    { 
                        endpoint: this.endpoint, 
                        auth: { 
                            masterKey: this.masterKey 
                        }
                    });
            }
            this.checkIfInitialized();
            return this.client;
        } catch (error) {
            throw Error(error);
        }
    }

    private async createDatabase() {
        try {
            const database = await this.client.databases.createIfNotExists({id: this.databaseId });
            console.log(`Created database: ${this.databaseId}`);   
        } catch (error) {
            throw Error(error);
        }
    }

    private async readDatabase() {
        try {
            const definition = await this.client.database(this.databaseId).read();
            console.log(`Reading database: ${definition.database.id}`);
        } catch (error) {
            throw Error(error);   
        }
    }

    private async createContainer() {
        try {
            const result = await this.client.database(this.databaseId).containers.createIfNotExists(
                { 
                    id: this.containerId, 
                    partitionKey: this.partitionKey
                }, 
                { 
                    offerThroughput: 400 
                });
            console.log(`Created container: ${result.container.id}`);   
        } catch (error) {
            throw Error(error);
        }
    }

    private async readContainer() {
        try {
            const result = await this.client.database(this.databaseId).container(this.containerId).read();
            console.log(`Reading container ${result.body.id}`);   
        } catch (error) {
            throw Error(error);
        }
    }

}