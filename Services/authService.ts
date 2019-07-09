import { HttpRequest } from "@azure/functions";
import { User } from "../Dto/user";

export class AuthService {

    constructor() {

    }

    extractUser(req: HttpRequest): User {
        const user = {
            email: req.headers["x-ms-client-principal-name"],
            authProvider: req.headers["x-ms-client-principal-idp"],
            userAgent: req.headers["user-agent"],
            clientIp: req.headers["client-ip"],
        } as User;

        return user;
    }
}