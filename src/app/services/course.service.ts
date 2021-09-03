import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { first, map, mergeMap, tap } from 'rxjs/operators';
import { Access } from '../model/access.model';
import { Chapter } from '../model/chapter.model';
import { Course } from '../model/course.model';
import { Code, CodeDb } from '../model/task.model';

@Injectable({
    providedIn: 'root'
})
export class CourseService {


    constructor(private db: AngularFirestore) {
    }

    getCourse(courseid: string): Observable<Course> {

        return this.db.collection<Course>('courses', ref => ref.where('name', '==', courseid))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    if (changes.length !== 1) {

                        throw new Error('Too much results for course name:' + courseid);
                    }
                    const c = changes[0];
                    return new Course({ id: c.payload.doc.id, ...c.payload.doc.data() })
                }),
                tap(course => console.log("Course retrieved from database", course)),
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

    getCourseById(courseid: string): Observable<Course> {
        return this.db.collection<Course>('courses').doc(courseid)
            .snapshotChanges()
            .pipe(
                // tap(c => console.log("---> Course service - Course by id", c.payload.data())),
                map((c: any) => new Course({ id: c.payload.id, ...c.payload.data() }))
            );
    }

    /**
     * Check if the given courseid is published or not. Returns the course id if
     */
    isPublished(coursename: string): Observable<{ isPublished: boolean, courseid: string }> {
        return this.db.collection<Course>('courses', ref => ref.where('name', '==', coursename))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    // console.log("changes here", changes);
                    if (changes.length !== 1) {
                        throw new Error('Too much results for course name:' + coursename);
                    }
                    const c = changes[0].payload.doc.data();
                    const courseid = changes[0].payload.doc.id;
                    return {
                        isPublished: c.published,
                        courseid: courseid
                    }
                })
            )
    }

    /**
     * Return course information that can be accessed by the uid given in parameter
     * @returns 
     */
    availableCourses(uid: string): Observable<Access[]> {
        return this.db
            .collection('access', ref => ref.where('uid', '==', uid))
            .snapshotChanges()
            .pipe(
                map(availableCourses => availableCourses.map((access: any) => new Access({ id: access.payload.doc.id, ...access.payload.doc.data() }))),
                tap(availableCourse => console.log("--> Course service - available courses for uid", availableCourse))
            )
    }

    /**
     * Returns all published course
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

    /**
     * Returns all published course
     */
    getDrafts(uid: string): Observable<any> {

        return this.availableCourses(uid).pipe(
            tap(d => console.log("Access for uid", d)),
            mergeMap((access: Access[]) => {
                if (access.length === 0) {
                    return of([]);
                }
                const checkCourse = access.map((acc: Access) => this.getCourseById(acc.courseid).pipe(first()));
                return forkJoin(checkCourse);
            }),
            tap(drafts => console.log("Get all drafts", drafts)
            )
        )


        // return this.db.collection<Course[]>(
        //     'courses',
        //     ref => ref.where('published', '==', false)
        // )
        //     .snapshotChanges()
        //     .pipe(
        //         tap(data => console.log("icici")),
        //         map(
        //             changes =>
        //                 changes.map(c => (new Course({ id: c.payload.doc.id, ...c.payload.doc.data() })))
        //         ));
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

    delete(courseid: string): Promise<void> {
        return this.db.collection('courses').doc(courseid).delete();
    }

    addAccess(courseid: string, uid: string, accessType: string) {
        return this.db.collection('access').add({ uid: uid, type: accessType, courseid: courseid });
    }

    removeAccess(accessid: string) {
        return this.db.collection('access').doc(accessid).delete();
    }

    getAccessForCourse(courseid: string): Observable<Access[]> {
        return this.db.collection('access', ref => ref.where('courseid', '==', courseid)).snapshotChanges()
            .pipe(map(
                accesses => accesses.map((acc: any) => (new Access({ id: acc.payload.doc.id, ...acc.payload.doc.data() })))
            ));
    }

    removeAllAccessForCourse(courseid: string): Observable<any> {
        return this.getAccessForCourse(courseid).pipe(
            map((allAccess: Access[]) => {
                const removeAllAccess = allAccess.map(acc => this.removeAccess(acc.id));
                return forkJoin(removeAllAccess);
            }),
            tap(x => console.log("All access for course removed!"))
        )
    }
}
