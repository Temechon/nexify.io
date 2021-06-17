import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { Chapter } from '../model/chapter.model';
import { Course } from '../model/course.model';
import { Code, CodeDb, Task } from '../model/task.model';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private db: AngularFirestore) {
    }

    getCourse(courseid: string): Observable<any> {

        return this.db.collection<Chapter>('courses').doc(courseid).valueChanges().pipe(
            map((courseDb: any) => {
                const course = new Course(courseDb);
                course.id = courseid;
                return course;
            })
        )
    }

    /**
     * Get step with all its tasks
     */
    getStep(courseid: string, stepid: string): Observable<any> {

        return this.db.collection<Chapter>('courses').doc(courseid).collection('steps').doc(stepid).valueChanges().pipe(
            map((stepDb: any) => {
                const step = new Chapter(stepDb);
                step.id = courseid;
                return step;
            }),
            mergeMap((step: Chapter) => {

                const allCodesForTask = step.tasks.map((task: Task) => {
                    return this.getCodesByTaskid(task.id).pipe(
                        take(1),
                        map((allCodesForTask: Code[]) => {
                            task.codes = allCodesForTask;
                            return allCodesForTask;
                        })
                    )
                });
                return forkJoin(allCodesForTask).pipe(
                    map((allCodes: Array<any>) => step)
                )
            })
        )
    }

    /**
     * Returns all Courses
     */
    getAll(): Observable<Chapter[]> {

        return this.db.collection<Chapter[]>(
            'courses'
        )
            .snapshotChanges()
            .pipe(map(
                changes =>
                    changes.map(c => (new Chapter({ id: c.payload.doc.id, ...c.payload.doc.data() })))
            ));
    }

    getCode(codeid: string) {
        return this.db.collection<any>('codes').doc(codeid).valueChanges();
    }

    getCodesByTaskid(taskid: string): Observable<Code[]> {
        return this.db.collection<CodeDb>('codes', ref => ref.where('taskid', '==', taskid)).snapshotChanges()
            .pipe(map(
                codes => codes.map(c => (new Code({ id: c.payload.doc.id, ...c.payload.doc.data() })))
            ));
    }


    save(course: Course) {
        this.db.collection('courses').doc(course.id).set(course.toObject());
    }

    delete(Courseid: string): Promise<void> {
        return this.db.collection('courses').doc(Courseid).delete();
    }
}
