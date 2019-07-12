import { CosmosClient, PartitionKeyDefinition } from "@azure/cosmos";

export class CosmosSqlHelper {
    
    endpoint: string;
    masterKey: string;
    databaseId: string;
    containerId: string;
    partitionKey = { kind: "Hash", paths: ["/Country"] } as PartitionKeyDefinition;

    client: CosmosClient;
    initialized: boolean = false;

    constructor(databaseId?: string, containerId?: string) {
        this.endpoint = process.env['COSMOS_SQL_ENDPOINT']
        if (!this.endpoint) {
            throw Error('COSMOS_SQL_ENDPOINT environment variable not found.');
        }
        this.masterKey = process.env['COSMOS_SQL_MASTERKEY']
        if (!this.masterKey) {
            throw Error('COSMOS_SQL_MASTERKEY environment variable not found.');
        }
        
        this.databaseId = (databaseId) ? databaseId :  "PracticeDb";
        this.containerId = (containerId) ? containerId : "People";
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
            await this.initialize();
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
                    // partitionKey: this.partitionKey
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

    async cleanup(databaseId: string) {
        await this.client.database(databaseId).delete();
    }

}