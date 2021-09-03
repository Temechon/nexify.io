import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Course } from '../model/course.model';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  allPublishedCourses: Observable<Course[]>;

  allDrafts: Observable<Course[]>;

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.allPublishedCourses = this.courseService.getAll();

    this.allDrafts = this.courseService.getDrafts(this.authService.uid);
    // this.authService.uid.pipe(first()).subscribe((uid: string) => {
    //   this.allDrafts = this.courseService.getDrafts(uid);
    // })

  }
}
