import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Course } from 'src/app/model/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'dashboard-my-courses',
  templateUrl: './dashboard-my-courses.component.html',
  styleUrls: ['./dashboard-my-courses.component.scss']
})
export class DashboardMyCoursesComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService,
    private authService: AuthService) { }

  allDrafts: Observable<Course[]>;

  ngOnInit(): void {

    this.authService.uid.pipe(first()).subscribe((uid: string) => {
      this.allDrafts = this.courseService.getDrafts(uid);
      this.loaderService.hide();
    })
  }

}
