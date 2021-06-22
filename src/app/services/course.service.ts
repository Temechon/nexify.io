import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';
import { Chapter } from '../model/chapter.model';
import { Course } from '../model/course.model';
import { Code, CodeDb } from '../model/task.model';

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
            }),
            mergeMap((course: Course) => {
                return this.getCodesByTaskid(course.home.id).pipe(
                    first(),
                    map((allCodesForTask: Code[]) => {
                        console.log("retrieving course la !");
                        course.home.codes = allCodesForTask;
                        return course;
                    })
                )
            })
        );
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
        // Save all codes in course.home
        const codes = course.home.codes;
        for (let code of codes) {
            this.db.collection('codes').doc(code.id).set(code.toObject());
        }

        this.db.collection('courses').doc(course.id).set(course.toObject());
    }

    delete(Courseid: string): Promise<void> {
        return this.db.collection('courses').doc(Courseid).delete();
    }
}
