import * as _ from 'underscore';
import { Task } from "./task.model";

export class Course {
    id: string;
    title: string;
    home: Task;
    introduction: string;
    prerequisite: Task;
    objectives: Task;

    constructor(params: any) {
        this.id = params.id;
        this.title = params.title;
        this.home = new Task(params.home);

        this.introduction = params.introduction;
        this.prerequisite = new Task(params.prerequisite);
        this.objectives = new Task(params.objectives);
    }

    toObject() {
        // Remove undefined properties from object, otherwise it cannot be saved
        let res: any = _.pick(this, (value: any) => {
            return !_.isUndefined(value);
        });

        res.home = this.home.toObject();
        res.prerequisite = this.prerequisite.toObject();
        res.objectives = this.objectives.toObject();

        delete res.id;

        return res;
    }
}
