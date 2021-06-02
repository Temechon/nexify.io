import { Task } from "./task.model";
import * as _ from 'underscore';

export class Course {

    id: string;
    tasks: Array<Task> = [];
    title: string;

    constructor(params: any) {
        this.id = params.id;
        this.title = params.title;

        if (params.tasks) {
            for (let task of params.tasks) {
                this.tasks.push(new Task(task));
            }
        }

    }

    toObject(): any {

        // Remove undefined properties from object, otherwise it cannot be saved
        let res: any = _.pick(this, (value: any) => {
            return !_.isUndefined(value);
        });

        delete res.id;

        return res;
    }

}