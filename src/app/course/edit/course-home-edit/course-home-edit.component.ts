import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/gui/dialog/confirm-dialog.component';
import { Chapter } from 'src/app/model/chapter.model';
import { Course } from 'src/app/model/course.model';
import { ChapterService } from 'src/app/services/chapter.service';
import { CourseService } from 'src/app/services/course.service';
import { DialogService } from 'src/app/services/dialog.service';
import * as slug from 'slug';

@Component({
  selector: 'course-home-edit',
  templateUrl: './course-home-edit.component.html',
  styleUrls: ['./course-home-edit.component.scss']
})
export class CourseHomeEditComponent implements OnInit {

  course: Course;
  chapters: Chapter[];

  saveCourseSub = new Subject();
  saveChapterSub = new Subject<number>();
  isUriUniqueSub = new Subject<number>();
  toDestroy: Array<Subscription> = [];

  uriUnique = false;
  uriCheck = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private chapterService: ChapterService,
    private dialogService: DialogService
  ) {

  }

  ngOnInit(): void {

    this.toDestroy.push(
      this.saveCourseSub.pipe(debounceTime(500)).subscribe(() => {
        this._save()
      })
    )
    this.toDestroy.push(
      this.isUriUniqueSub.pipe(debounceTime(500)).subscribe(() => {
        this.isUriUnique()
      })
    )

    this.toDestroy.push(
      this.saveChapterSub.pipe(debounceTime(500)).subscribe((chapterIndex: number) => {

        this.chapters.map((chap: Chapter, index: number) => chap.order = index);
        console.log("Saving chapter", chapterIndex);
        this._saveChapter(chapterIndex);
      })
    );

    this.course = this.route.parent.snapshot.data.course;
    console.log("HOME EDIT --- Course:", this.course)
    // get all chapters for this course
    this.chapterService.getAll(this.course.id).pipe(first()).subscribe(chaps => this.chapters = chaps);
  }

  save() {
    this.saveCourseSub.next();
  }

  _save() {
    this.courseService.save(this.course);
  }

  publish() {

    // Display modal "are you sure ?"
    const dialogref = this.dialogService.openDialog(
      ConfirmDialogComponent,
      {
        title: "Publish this course?",
        content: "<span class='font-semibold'>Are you sure you want to publish this course?</span><br><br> After publishing, this course will be public and be visible by everyone.",
        button1: {
          text: 'Publish',
          param: 'publish'
        },
        button2: {
          text: 'Cancel',
          param: 'cancel',
          type: 'cancel'
        }
      }
    );

    dialogref.onClose.subscribe((data: string) => {
      if (data === "publish") {
        this.course.published = true;
        this._save()
      }
    })
  }

  unpublish() {
    this.course.published = false;
    this._save()
  }

  /**
   * Save directly all chapters in database
   */
  _saveChapters() {
    // Set order index in chapters and next/previous chapters ids
    this.chapters.map((chap: Chapter, index: number) => {

      chap.order = index;
      chap.previousChapterId = null;
      chap.nextChapterId = null;

      const previous = this.chapters[index - 1];
      const next = this.chapters[index + 1];
      if (previous) {
        chap.previousChapterId = previous.id;
      }
      if (next) {
        chap.nextChapterId = next.id;
      }
    });
    this.chapters.map((chap: Chapter) => this.chapterService.save(this.course.id, chap));
  }

  /**
   * Save directly the given chapter in database
   */
  _saveChapter(index: number) {
    this.chapterService.save(this.course.id, this.chapters[index]);
  }

  /**
   * Add the given chapter to save into the subject queue.
   */
  saveChapter(index: number) {
    this.saveChapterSub.next(index);
  }

  reorder(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
    this._saveChapters();
  }

  updateName(nameField: any) {
    // Slugify the title
    const slugged = slug(this.course.title);
    nameField.value = slugged;
    this.course.name = slugged;
    this.checkCourseUri();
    // this.save();
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
        this.chapterService.delete(this.course.id, this.chapters[index])
        this.chapters.splice(index, 1);
      }
    })
  }

  addChapter() {
    const newChap = new Chapter();
    this.chapters.push(newChap)
    this._saveChapter(this.chapters.length - 1);
    setTimeout(() => {
      (document.querySelector('#chapter-' + newChap.id) as HTMLInputElement).focus();
    }, 50)
  }

  /**
   * Check if this uri is unique or not
   */
  checkCourseUri() {
    this.isUriUniqueSub.next()
  }

  isUriUnique() {
    this.courseService.isUriUnique(this.course.name).then((uriUnique: any) => {
      console.log("ici", uriUnique)
      this.uriUnique = uriUnique;
      this.uriCheck = true;
      if (this.uriUnique) {
        this.save();
      }
    })
  }

  ngOnDestroy() {
    this.toDestroy.map(sub => sub.unsubscribe());
    this.toDestroy = [];
  }

}
