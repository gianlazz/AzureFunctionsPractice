import Axios from "axios";
import * as dbHelpers from '../common/dal/cosmosDbHelpers';
import { Person } from "../common/dto/person";

beforeAll(async () => {
    jest.setTimeout(30000);
});
afterAll(async () => {
    console.log(`Deleting PracticeDb after tests to cleanup.`);
    const settings = require('../local.settings.json');
    const client = dbHelpers.getClient(settings.Values.COSMOS_SQL_ENDPOINT, settings.Values.COSMOS_SQL_MASTERKEY);
    await dbHelpers.cleanup("PracticeDb", client);
    console.log(`Deleted PracticeDb from tests.`);
});

let createdPersons: Person[] = new Array<Person>();

describe("HttpTrigger", () => {
    it("POST", async () => {
        // Arrange
        const person = new Person();
        person.firstName = "John";
        person.lastName = "Doe";
        console.log("Running POST/create against REST.");
        
        // Act
        const response = await Axios.post('http://localhost:7071/api/HttpTrigger', person);
        const insertedPersonId = response.data;
        person.id = insertedPersonId;
        createdPersons.push(person);
        
        // Assert
        console.log(`DB Id of newly posted/inserted person ${insertedPersonId}`);
        expect(response).not.toBeNull();
    });

    it("GET", async () => {
        // Arrange
        console.log("Running GET against REST.");
        
        // Act
        let url = `http://localhost:7071/api/HttpTrigger?id=${createdPersons[0].id}`;
        const response = await Axios.get(url);
        const returnedPerson: Person = response.data;
        
        // Assert
        console.log(`REST GET results from person id ${createdPersons[0].id}:`);
        console.log(JSON.stringify(returnedPerson), null, 2);
        expect(returnedPerson).not.toBeNull();
    });

    it("GET many", async () => {
        // Arrange
        console.log('Posting more to test getMany.')
        for (let i = 0; i < 2; i++) {
            const person = new Person();
            person.firstName = "John";
            person.lastName = "Doe";
            
            const response = await Axios.post('http://localhost:7071/api/HttpTrigger', person);
            person.id = response.data;
            createdPersons.push(person);
        }

        let ids: string[] = [];
        for (let index = 0; index < createdPersons.length; index++) {
            const person = createdPersons[index];
            ids.push(person.id);
        }
        const requestBodyData = {
            ids
        };

        // Act
        console.log("Running GET getMany against REST.");
        const response = await Axios.get('http://localhost:7071/api/HttpTrigger', {
            data: requestBodyData
        });
        const returnedPeople: Person[] = response.data;

        // Assert
        console.log('REST GET getMany results:')
        console.log(JSON.stringify(returnedPeople, null, 2));
        expect(returnedPeople).not.toBeNull();
    });

    it("DELETE", async () => {
        // Arrange
        const idOfPersonToDelete = createdPersons[createdPersons.length - 1].id;
        const url = `http://localhost:7071/api/HttpTrigger?id=${idOfPersonToDelete}`;
        
        // Act
        console.log("RUNNING DELETE against REST.");
        const response = await Axios.delete(url);

        // Assert
        console.log('REST DELETE results:');
        console.log(JSON.stringify(response.data, null, 2));
        expect(response.data).not.toBeNull();
        expect(response.data).toEqual(idOfPersonToDelete);
    });

    it("PATCH", async () => {
        // Arrange
        const personToUpdate = createdPersons[0];
        personToUpdate.firstName = "NewFirstName";
        personToUpdate.lastName = "NewLastName";
        
        // Act
        const response = await Axios.patch('http://localhost:7071/api/HttpTrigger', personToUpdate);
        const updatePerson = response.data;
        
        // Assert
        expect(updatePerson).not.toBeNull();
    });
});