import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/gui/dialog/confirm-dialog.component';
import { Chapter } from 'src/app/model/chapter.model';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { DialogService } from 'src/app/services/dialog.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'course-home-edit',
  templateUrl: './course-home-edit.component.html',
  styleUrls: ['./course-home-edit.component.scss']
})
export class CourseHomeEditComponent implements OnInit {

  course: Course;
  steps: Chapter[];

  saveCourseSub = new Subject();
  saveChapterSub = new Subject<number>();

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private stepService: StepService,
    private dialogService: DialogService
  ) {
    console.log("constructor course home edit");

    this.saveCourseSub.pipe(debounceTime(500)).subscribe(() => {
      this._save()
    })

    this.saveChapterSub.pipe(debounceTime(500)).subscribe((chapterIndex: number) => {

      this.steps.map((step: Chapter, index: number) => step.order = index);
      console.log("Saving chapter", chapterIndex);
      this._saveChapter(chapterIndex);
    })
  }

  ngOnInit(): void {
    this.course = this.route.parent.snapshot.data.course;
    console.log("HOME EDIT --- Course:", this.course)
    // get all steps for this course
    this.stepService.getAll(this.course.id).pipe(first()).subscribe(steps => this.steps = steps);
  }

  save() {
    this.saveCourseSub.next();
  }

  _save() {
    this.courseService.save(this.course);
  }

  /**
   * Save directly all chapters in database
   */
  _saveChapters() {
    this.steps.map((step: Chapter, index: number) => step.order = index);
    this.steps.map((step: Chapter) => this.stepService.save(this.course.id, step));
  }

  /**
   * Save directly the given chapter in database
   */
  _saveChapter(index: number) {
    this.stepService.save(this.course.id, this.steps[index]);
  }

  /**
   * Add the given chapter to save into the subject queue.
   */
  saveChapter(index: number) {
    this.saveChapterSub.next(index);
  }

  reorder(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    this._saveChapters();
  }

  deleteChapter(index: number) {
    // Display modal "are you sure ?"
    const dialogref = this.dialogService.openDialog(
      ConfirmDialogComponent,
      {
        title: "Are you sure?",
        content: "<span class='font-semibold'>Are you sure you want to delete this chapter?</span><br><br> All tasks linked to this chapter will be deleted as well.",
        button1: {
          text: 'Delete',
          param: 'delete'
        },
        button2: {
          text: 'Cancel',
          param: 'cancel',
          type: 'cancel'
        }
      }
    );

    dialogref.onClose.subscribe((data: string) => {
      if (data === "delete") {
        console.log("DELETE CHAPTER", index)
        this.stepService.delete(this.course.id, this.steps[index])
        this.steps.splice(index, 1);
      }
    })
  }

  addChapter() {
    const newStep = new Chapter();
    this.steps.push(newStep)
    this._saveChapter(this.steps.length - 1);
    setTimeout(() => {
      (document.querySelector('#step-' + newStep.id) as HTMLInputElement).focus();
    }, 50)
  }

}
