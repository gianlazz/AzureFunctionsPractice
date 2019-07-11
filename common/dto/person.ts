export class Person {

    id: string = undefined;
    firstName: string = undefined;
    lastName: string = undefined;

    constructor(obj?: any) {
        if (obj)
            for (let key in this) 
                if (obj.hasOwnProperty(key)) 
                    this[key] = obj[key];
    }

}