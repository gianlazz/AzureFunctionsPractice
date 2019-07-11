import { Person } from "../common/dto/person";
import Axios from "axios";

beforeAll(async () => {

});
afterAll(async () => {

});

describe("HttpTrigger", () => {
    it("POST", async () => {
        // Arrange
        let person = new Person();
        person.firstName = "John";
        person.lastName = "Doe";
        console.log("Running POST/create against REST.");
        // Act
        const response = await Axios.post('http://localhost:7071/api/HttpTrigger', person);
        const insertedPersonId = response.data;
        // Assert
        console.log(`DB Id of newly posted/inserted person ${insertedPersonId}`);
        expect(response).not.toBeNull();
    });

    it("GET", async () => {
        // Arrange

        // Act

        // Assert
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