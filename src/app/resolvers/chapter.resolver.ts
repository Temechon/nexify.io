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
        let courseid = route.parent.paramMap.get('id');
        console.log('chapterid', chapid, 'courseid', courseid)

        // Check if the project is the same as the previous one
        if (chapid && courseid) {
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
