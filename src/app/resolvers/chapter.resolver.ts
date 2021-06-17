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
        private stepService: ChapterService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chapter> {

        // Check if the note id is in the curent route
        let stepid = route.paramMap.get('step');
        let courseid = route.parent.paramMap.get('id');
        console.log('STEPID', stepid, 'courseid', courseid)
        // if (!stepid || !courseid) {
        //     stepid = route.parent.paramMap.get('step');
        //     courseid = route.parent.paramMap.get('id');
        //     console.log('STEPID', stepid, 'courseid', courseid)
        // }

        // Check if the project is the same as the previous one
        if (stepid && courseid) {
            // Otherwise, retrieve it from database
            return this.stepService.get(courseid, stepid).pipe(
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
