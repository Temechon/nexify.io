import * as _ from 'underscore';
import { Helpers } from "../helpers/Helpers";
import { Code, Task } from "./task.model";


export class Chapter {

    id: string;
    tasks: Array<Task> = [];
    title: string;
    order: number;

    constructor(params: any = {}) {

        this.id = params.id || Helpers.guid();
        this.title = params.title;
        this.order = params.order;

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

        res.tasks = res.tasks.map((t: Task) => t.toObject());

        delete res.id;

        return res;
    }

    getCodes(): Array<Code> {
        let res = []
        for (let task of this.tasks) {
            for (let code of task.codes) {
                res.push(code);
            }
        }
        return res;
    }

}