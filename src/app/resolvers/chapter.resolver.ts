import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Chapter } from '../model/chapter.model';
import { ChapterService } from '../services/chapter.service';

@Injectable({
    providedIn: 'root',
})
export class ChapterResolver {

    constructor(
        private chapterService: ChapterService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chapter> {

        // Check if the note id is in the curent route
        let chapid = route.paramMap.get('chapter');
        let coursename = route.parent.paramMap.get('name');
        let courseid = route.parent.data.course.id;
        console.log('chapterid', chapid, 'coursename', coursename, 'courseid', courseid)

        // Check if the project is the same as the previous one
        if (chapid && coursename) {
            // Otherwise, retrieve it from database
            return this.chapterService.get(courseid, chapid).pipe(
                take(1),
                catchError(
                    err => {
                        console.error(err);
                        this.router.navigate(['']);
                        return EMPTY
                    }
                )
            )
        } else {
            return EMPTY;

        }
    }
}
