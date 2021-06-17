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
