import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/gui/dialog/confirm-dialog.component';
import { Chapter } from 'src/app/model/chapter.model';
import { Course } from 'src/app/model/course.model';
import { ChapterService } from 'src/app/services/chapter.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Task } from '../../../model/task.model';

@Component({
  selector: 'chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.scss']
})
export class ChapterEditComponent implements OnInit {

  chapter: Chapter;

  course: Course;

  saveSub = new Subject();

  private toDestroy: Array<Subscription> = [];



  constructor(
    private chapterService: ChapterService,
    private dialogService: DialogService,
    private route: ActivatedRoute) {


  }

  ngOnInit(): void {

    this.toDestroy.push(
      this.saveSub.pipe(debounceTime(500)).subscribe(() => {
        this._saveChapter();
      })
    )

    this.toDestroy.push(
      this.route.data.subscribe((data) => {
        this.chapter = data.chapter;
      })
    )
    this.course = this.route.parent.parent.snapshot.data.course;
  }

  addTask() {
    this.chapter.tasks.push(new Task({
      id: '',
      title: '',
      content: []
    }))
  }

  deleteTask(index: number) {
    // Display modal "are you sure ?"
    const dialogref = this.dialogService.openDialog(
      ConfirmDialogComponent,
      {
        title: "Are you sure?",
        content: "<span class='font-semibold'>Are you sure you want to delete this task?</span><br><br> All content linked to this task will be deleted as well.",
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
        this.chapter.tasks.splice(index, 1);
        this.saveChapter();
      }
    })
  }

  saveChapter() {
    this.saveSub.next();
  }

  private _saveChapter() {
    this.chapterService.save(this.course.id, this.chapter);
  }

  ngOnDestroy() {
    this.toDestroy.map(sub => sub.unsubscribe());
    this.toDestroy = [];
  }

  reorderTask($event: EventTarget, index: number, delta: number) {

    const pos = ($event as HTMLDivElement).offsetTop
    moveItemInArray(this.chapter.tasks, index, index + delta);
    this.saveChapter();
  }

}
