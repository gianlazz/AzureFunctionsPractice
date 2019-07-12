import { Person } from "../common/dto/person";
import Axios from "axios";

beforeAll(async () => {
    jest.setTimeout(30000);
});
afterAll(async () => {

});

let createdPersons: Person[] = [];

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

        // Act

        // Assert
    });

    it("DELETE", async () => {
        // Arrange

        // Act

        // Assert
    });

    it("PATCH", async () => {
        // Arrange

        // Act

        // Assert
    });
})