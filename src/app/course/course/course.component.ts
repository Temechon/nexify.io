import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/model/chapter.model';
import { Course } from 'src/app/model/course.model';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course: Course;
  steps: Observable<Chapter[]>;

  constructor(
    private route: ActivatedRoute,
    private stepService: StepService) { }

  ngOnInit(): void {

    this.course = this.route.snapshot.data.course
    console.log("SIDEBAR --- Course:", this.course);

    // get all steps for this course
    this.steps = this.stepService.getAll(this.course.id)
  }
}
