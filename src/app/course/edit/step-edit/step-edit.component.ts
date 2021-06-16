import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Course, Step } from 'src/app/model/course.model';
import { StepService } from 'src/app/services/step.service';
import { Task } from '../../../model/task.model';

@Component({
  selector: 'step-edit',
  templateUrl: './step-edit.component.html',
  styleUrls: ['./step-edit.component.scss']
})
export class StepEditComponent implements OnInit {

  step: Step;

  course: Course;

  saveSub = new Subject();



  constructor(private stepService: StepService,
    private route: ActivatedRoute) {

    this.saveSub.pipe(debounceTime(500)).subscribe(() => {
      this._saveCourse();
    })

  }

  ngOnInit(): void {

    this.route.data.subscribe((data) => {
      this.step = data.step;
    })
    this.course = this.route.parent.parent.snapshot.data.course;
  }

  addTask() {
    this.step.tasks.push(new Task({
      id: '',
      title: '',
      content: []
    }))

  }

  saveCourse() {
    this.saveSub.next();
  }

  private _saveCourse() {
    this.stepService.save(this.course.id, this.step);
  }

  ngOnDestroy() {
    console.log("removing savesubject on cours eedit");
    this.saveSub.complete();
  }

}
