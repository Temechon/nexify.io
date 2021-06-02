import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, take, tap, toArray } from 'rxjs/operators';
import { Course } from '../model/course.model';
import { CodeDb, TaskDb, Task, Code, CourseDb } from '../model/task.model';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private db: AngularFirestore) {
    }

    get(nId: string): Observable<any> {

        return this.db.collection<Course>('courses').doc(nId).valueChanges().pipe(
            map((coursedb: CourseDb) => {
                const course = new Course(coursedb);
                course.id = nId;
                return course;
            }),
            mergeMap((course: Course) => {

                const allCodesForTask = course.tasks.map((task: Task) => {
                    return this.getCodesByTaskid(task.id).pipe(
                        take(1),
                        map((allCodesForTask: Code[]) => {
                            task.codes = allCodesForTask;
                            return allCodesForTask;
                        })
                    )
                });
                return forkJoin(allCodesForTask).pipe(
                    map((allCodes: Array<any>) => course)
                )
            })
        )
    }

    /**
     * Returns all Courses
     */
    getAll(): Observable<Course[]> {

        return this.db.collection<Course[]>(
            'courses'
        )
            .snapshotChanges()
            .pipe(map(
                changes =>
                    changes.map(c => (new Course({ id: c.payload.doc.id, ...c.payload.doc.data() })))
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

    create(): Promise<void> {
        const course = new Course({});
        return this.save(course);
    }

    save(course: Course): Promise<void> {
        return this.db.collection('courses').doc(course.id).set(course.toObject())
    }

    delete(Courseid: string): Promise<void> {
        return this.db.collection('courses').doc(Courseid).delete();
    }
}
