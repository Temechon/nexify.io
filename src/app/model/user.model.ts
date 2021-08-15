export class User {

    login: string;
    uid: string;

    constructor(params: any) {

        this.login = params?.login || '';
        this.uid = params?.uid || '';
    }
}