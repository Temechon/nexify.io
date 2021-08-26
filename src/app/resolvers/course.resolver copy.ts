import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Chapter } from '../model/chapter.model';
import { CourseService } from '../services/course.service';

@Injectable({
    providedIn: 'root',
})
export class CourseResolver {

    constructor(
        private courseService: CourseService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chapter> {

        // Check if the note id is in the curent route
        let name = route.paramMap.get('name');
        console.log("COURSE ID", name)

        // Check if the project is the same as the previous one
        if (name) {
            // Otherwise, retrieve it from database
            return this.courseService.getCourse(name).pipe(
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
