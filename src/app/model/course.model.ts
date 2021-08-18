import * as _ from 'underscore';
import { Task } from "./task.model";

export class Course {
    /** THe ID in Firestore */
    id: string;
    /** The url displayed at the top */
    name: string;
    title: string;
    /** dislpayName of the author */
    author: string;
    /** true if this course is public, false otherwise */
    isPublic: boolean;
    /** true if this course is published, false otherwise */
    published: boolean;


    objectives: Task;
    prerequisite: Task;
    home: Task;

    constructor(params: any) {
        this.id = params.id;
        this.name = params.name;
        this.title = params.title;
        this.author = params.author;
        this.isPublic = params.isPublic;
        this.published = params.published;

        this.home = new Task(params.home);
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
