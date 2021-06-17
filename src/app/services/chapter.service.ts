import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { Chapter } from '../model/chapter.model';
import { Code, CodeDb, Task } from '../model/task.model';

@Injectable({
    providedIn: 'root'
})
export class ChapterService {

    constructor(private db: AngularFirestore) {
    }

    /**
     * Get a chapter with all its tasks, and all codes linked in its tasks
     */
    get(courseid: string, chapterid: string): Observable<any> {

        return this.db.collection<Chapter>('courses').doc(courseid).collection('steps').doc(chapterid).valueChanges().pipe(
            map((chapDb: any) => {
                const chapter = new Chapter(chapDb);
                chapter.id = chapterid;
                return chapter;
            }),
            mergeMap((chapter: Chapter) => {

                const allCodesForTask = chapter.tasks.map((task: Task) => {
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
                            console.log("ici !", chapter);
                            return chapter
                        })
                    )
                } else {
                    return of(chapter);
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
     * Returns all chapters for a given course, sorted by order asc
     */
    getAll(courseid: string): Observable<Chapter[]> {

        return this.db.collection<Chapter[]>('courses').doc(courseid).collection('steps', ref => ref.orderBy('order'))
            .snapshotChanges()
            .pipe(map(
                changes =>
                    changes.map(c => (new Chapter({ id: c.payload.doc.id, ...c.payload.doc.data() })))
            ));
    }


    /**
     * Save this chapter and all codes relatives to its subtasks in database.
     * @returns 
     */
    save(courseid: string, chapter: Chapter): Promise<void> {
        const saveCoursePromise = this.db.collection('courses').doc(courseid).collection('steps').doc(chapter.id).set(chapter.toObject());

        const allCodes = chapter.getCodes();

        for (let code of allCodes) {
            this.db.collection('codes').doc(code.id).set(code.toObject());
        }
        return saveCoursePromise;
    }

    delete(courseid: string, chapter: Chapter): Promise<void> {
        // Delete all codes relative to all tasks of this chapter  
        for (let task of chapter.tasks) {
            this.deleteCodesForTask(task.id);
        }

        return this.db.collection('courses').doc(courseid).collection('steps').doc(chapter.id).delete();
    }

    deleteCodesForTask(taskid: string) {
        this.db.collection('codes', ref => ref.where('taskid', '==', taskid)).snapshotChanges().forEach(doc => doc.map(d => d.payload.doc.ref.delete()))
    }
}
