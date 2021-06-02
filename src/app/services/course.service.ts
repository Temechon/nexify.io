import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, throwError } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Course } from '../model/course.model';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private db: AngularFirestore) {
    }

    get(nId: string): Observable<Course> {

        return this.db.collection<Course>('courses').doc(nId).valueChanges().pipe(
            switchMap(data => {
                if (data) {
                    const b = new Course(data);
                    b.id = nId;
                    return of(b);
                } else {
                    return throwError(new Error(`Course ${nId} not found in database`));
                }
            }),
            mergeMap(

            )
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
