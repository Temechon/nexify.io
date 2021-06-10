import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Step } from '../model/course.model';
import { CourseService } from '../services/course.service';
import { StepService } from '../services/step.service';

@Injectable({
    providedIn: 'root',
})
export class StepResolver {

    constructor(
        private stepService: StepService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Step> {

        // Check if the note id is in the curent route
        let stepid = route.paramMap.get('step');
        let courseid = route.paramMap.get('id');
        console.log('STEPID', stepid, 'courseid', courseid)

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
