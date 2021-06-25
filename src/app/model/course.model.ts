import * as _ from 'underscore';
import { Task } from "./task.model";

export class Course {
    id: string;
    title: string;
    home: Task;
    introduction: string;
    prerequisite: string;
    objectives: string;

    constructor(params: any) {
        this.id = params.id;
        this.title = params.title;
        this.home = new Task(params.home);

        this.introduction = params.introduction;
        this.prerequisite = params.prerequisite;
        this.objectives = params.objectives;
    }

    toObject() {
        // Remove undefined properties from object, otherwise it cannot be saved
        let res: any = _.pick(this, (value: any) => {
            return !_.isUndefined(value);
        });

        res.home = this.home.toObject();

        delete res.id;

        return res;
    }
}
