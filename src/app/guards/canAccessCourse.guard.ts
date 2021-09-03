import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { catchError, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import _, { filter } from 'underscore';
import { Course } from '../model/course.model';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';

@Injectable({
    providedIn: 'root'
})
export class CanAccessCourseGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private courseService: CourseService,
        private router: Router) {

    }


    /**
     * A given course can be accessed in two cases:
     * - If the course is published and public, give access
     * - If the course is not published or not public, check if the user is connected and has access
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const name = route.paramMap.get('name');

        return this.courseService.isPublished(name).pipe(
            first(),
            switchMap((courseInfo: { isPublished: boolean, courseid: string }) => {
                console.log("--> Course guard", courseInfo, this.authService.uid)

                if (courseInfo.isPublished) {
                    console.log("--> Course guard - Course is published, give access");

                    return of(true);
                }
                console.log("--> Course guard - Course is not published, check access");
                return this.courseService.availableCourses(this.authService.uid).pipe(
                    first(),
                    tap(d => console.log("--> Course guard - access", d, "Course id:", courseInfo.courseid)),
                    map(allAccess => allAccess.filter(
                        (access: any) => access.courseid === courseInfo.courseid
                    ).length > 0)
                );
            })
        )
    }
}