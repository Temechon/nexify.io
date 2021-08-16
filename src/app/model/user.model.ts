export class User {

    displayName: string;
    uid: string;

    constructor(params: any) {

        this.displayName = params?.displayName || '';
        this.uid = params?.uid || '';
    }
}