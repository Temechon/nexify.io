import { Helpers } from "../helpers/Helpers";

export class Access {

    id: string;
    courseid: string;
    type: string;
    uid: string;

    constructor(params: any = {}) {

        this.id = params.id || Helpers.guid();
        this.courseid = params.courseid;
        this.type = params.type;
        this.uid = params.uid;
    }

}