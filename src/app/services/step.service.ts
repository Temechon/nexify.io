import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { Course, Step } from '../model/course.model';
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

        return this.db.collection<Step>('courses').doc(courseid).collection('steps').doc(stepid).valueChanges().pipe(
            map((stepDb: any) => {
                const step = new Step(stepDb);
                step.id = stepid;
                return step;
            }),
            mergeMap((step: Step) => {

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
     * Returns all step for a given course
     */
    getAll(courseid: string): Observable<Step[]> {

        return this.db.collection<Step[]>('courses').doc(courseid).collection('steps')
            .snapshotChanges()
            .pipe(map(
                changes =>
                    changes.map(c => (new Step({ id: c.payload.doc.id, ...c.payload.doc.data() })))
            ));
    }

    // create(): Promise<void> {
    //     const course = new Step({});
    //     return this.save(course);
    // }

    // save(course: Step): Promise<void> {
    //     const saveCoursePromise = this.db.collection('courses').doc(course.id).set(course.toObject());

    //     const allCodes = course.getCodes();

    //     for (let code of allCodes) {
    //         this.db.collection('codes').doc(code.id).set(code.toObject());
    //     }
    //     return saveCoursePromise;
    // }

    // delete(Courseid: string): Promise<void> {
    //     return this.db.collection('courses').doc(Courseid).delete();
    // }
}
