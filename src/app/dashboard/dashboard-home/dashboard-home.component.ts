import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor(private courseService: CourseService,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  private _creatingCourse = false;

  ngOnInit(): void {
    this.loaderService.hide()
  };

  createCourse() {

    if (this._creatingCourse) {
      return;
    }

    this._creatingCourse = true;
    this.loaderService.show();

    const displayName = this.authService.userData.displayName;

    // this.authService.uid().pipe(first(), mergeMap(uid => console.log("uid", uid)));

    this.courseService.create({
      author: displayName,
      published: false
    }).then((course: DocumentReference) => {


      return this.authService.uid().pipe(first()).toPromise().then((uid: string) => {

        return this.courseService.addAccess(course.id, uid, "author").then(() => {
          // Update the course name
          this.courseService.update({ id: course.id, name: course.id }).then(() => {
            this.loaderService.hide()
            this._creatingCourse = false;
            this.router.navigate(['/course', course.id, 'editor']);
          })
        })
      })
    })

  }
}
