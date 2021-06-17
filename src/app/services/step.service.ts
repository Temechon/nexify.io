import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { Chapter } from '../model/chapter.model';
import { Code, CodeDb, Task } from '../model/task.model';

@Injectable({
    providedIn: 'root'
})
export class StepService {

    constructor(private db: AngularFirestore) {
    }

    /**
     * Get step with all its tasks
     */
    get(courseid: string, stepid: string): Observable<any> {

        return this.db.collection<Chapter>('courses').doc(courseid).collection('steps').doc(stepid).valueChanges().pipe(
            map((stepDb: any) => {
                const step = new Chapter(stepDb);
                step.id = stepid;
                return step;
            }),
            mergeMap((step: Chapter) => {

                const allCodesForTask = step.tasks.map((task: Task) => {
                    return this.getCodesByTaskid(task.id).pipe(
                        take(1),
                        map((allCodesForTask: Code[]) => {
                            console.log("la !");
                            task.codes = allCodesForTask;
                            return allCodesForTask;
                        })
                    )
                });
                if (allCodesForTask.length > 0) {
                    return forkJoin(allCodesForTask).pipe(
                        map((allCodes: Array<any>) => {
                            console.log("ici !", step);
                            return step
                        })
                    )
                } else {
                    return of(step);
                }
            })
        )
    }

    getCodesByTaskid(taskid: string): Observable<Code[]> {
        return this.db.collection<CodeDb>('codes', ref => ref.where('taskid', '==', taskid)).snapshotChanges()
            .pipe(map(
                codes => codes.map(c => (new Code({ id: c.payload.doc.id, ...c.payload.doc.data() })))
            ));
    }

    /**
     * Returns all step for a given course, sorted by order asc
     */
    getAll(courseid: string): Observable<Chapter[]> {

        return this.db.collection<Chapter[]>('courses').doc(courseid).collection('steps', ref => ref.orderBy('order'))
            .snapshotChanges()
            .pipe(map(
                changes =>
                    changes.map(c => (new Chapter({ id: c.payload.doc.id, ...c.payload.doc.data() })))
            ));
    }

    // create(): Promise<void> {
    //     const course = new Step({});
    //     return this.save(course);
    // }

    /**
     * Save this step and all codes relatives to its subtasks in database.
     * @returns 
     */
    save(courseid: string, step: Chapter): Promise<void> {
        const saveCoursePromise = this.db.collection('courses').doc(courseid).collection('steps').doc(step.id).set(step.toObject());

        const allCodes = step.getCodes();

        for (let code of allCodes) {
            this.db.collection('codes').doc(code.id).set(code.toObject());
        }
        return saveCoursePromise;
    }

    delete(courseid: string, step: Chapter): Promise<void> {
        // Delete all codes relative to all tasks of this step  
        for (let task of step.tasks) {
            this.deleteCodesForTask(task.id);
        }

        return this.db.collection('courses').doc(courseid).collection('steps').doc(step.id).delete();
    }

    deleteCodesForTask(taskid: string) {
        this.db.collection('codes', ref => ref.where('taskid', '==', taskid)).snapshotChanges().forEach(doc => doc.map(d => d.payload.doc.ref.delete()))
    }
}
