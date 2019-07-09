export class User {

    //User's email address
    email: string = "";

    // aad, google, facebook etc
    authProvider: string = "";

    // User agent from request device
    userAgent: string = "";

    // IP address a request came from
    clientIp: string = "";
    
}