import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Chapter } from '../model/chapter.model';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';

@Injectable({
    providedIn: 'root',
})
export class CourseResolver {

    constructor(
        private courseService: CourseService,
        private authService: AuthService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chapter> {

        // Check if the course name is in the curent route
        let name = route.paramMap.get('name');

        // Retrieve user uid
        const uid = this.authService.userData.uid;

        // Check user access before giving him access to this course


        console.log("Resolver", "COURSE NAME", name)

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
