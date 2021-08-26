import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { first, map, mergeMap, tap } from 'rxjs/operators';
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

        return this.db.collection<Chapter>('courses', ref => ref.where('name', '==', courseid))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    console.log("changes here", changes);
                    if (changes.length !== 1) {

                        throw new Error('Too much results for course name:' + courseid);
                    }
                    const c = changes[0];
                    return new Course({ id: c.payload.doc.id, ...c.payload.doc.data() })
                }),
                tap(course => console.log("Course retrived from database", course)),
                // map((courseDb: any) => {
                //     const course = new Course(courseDb);
                //     course.id = courseid;
                //     return course;
                // }),
                mergeMap((course: Course) => {
                    return this.getCodesByTaskid(course.home.id).pipe(
                        first(),
                        map((allCodesForTask: Code[]) => {
                            // console.log("retrieving course la !");
                            course.home.codes = allCodesForTask;
                            return course;
                        })
                    )
                })
            );
    }

    /**
     * Returns all chapters
     */
    getAll(): Observable<Course[]> {

        return this.db.collection<Course[]>(
            'courses',
            ref => ref.where('published', '==', true)
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

    update(data: any) {
        return this.db.collection('courses').doc(data.id).set(data, {
            merge: true
        });
    }


    save(course: Course) {
        // Save all codes in course.home
        const codes = course.home.codes;
        for (let code of codes) {
            this.db.collection('codes').doc(code.id).set(code.toObject());
        }

        this.db.collection('courses').doc(course.id).set(course.toObject());
    }

    create(data: any) {
        return this.db.collection('courses').add(data);
    }

    delete(Courseid: string): Promise<void> {
        return this.db.collection('courses').doc(Courseid).delete();
    }

    addAccess(courseid: string, uid: string, accessType: string) {
        return this.db.collection('courses').doc(courseid).collection('access').add({ uid: uid, type: accessType });
    }

    removeAccess(courseid: string, accessid: string) {
        return this.db.collection('courses').doc(courseid).collection('access').doc(accessid).delete();
    }
}
