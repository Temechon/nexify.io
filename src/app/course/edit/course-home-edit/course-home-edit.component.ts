import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Course, Step } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'course-home-edit',
  templateUrl: './course-home-edit.component.html',
  styleUrls: ['./course-home-edit.component.scss']
})
export class CourseHomeEditComponent implements OnInit {

  course: Course;
  steps: Step[];

  saveSub = new Subject();

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private stepService: StepService
  ) {
    console.log("constructor course home edit");

    this.saveSub.pipe(debounceTime(500)).subscribe(() => {
      this._save()
    })
  }

  ngOnInit(): void {
    this.course = this.route.parent.snapshot.data.course;
    console.log("HOME EDIT --- Course:", this.course)
    // get all steps for this course
    this.stepService.getAll(this.course.id).pipe(first()).subscribe(steps => this.steps = steps);
  }

  save() {
    this.saveSub.next();
  }

  _save() {
    this.courseService.save(this.course);
  }

  reorder(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    this.steps.map((step: Step, index: number) => step.order = index);
    this.steps.map((step: Step) => this.stepService.save(this.course.id, step));

  }

}
