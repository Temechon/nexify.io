import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  allPublishedCourses: Observable<Course[]>;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.allPublishedCourses = this.courseService.getAll();
    this.allPublishedCourses.subscribe(data => console.log("icici", data));

  }

}
