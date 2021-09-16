import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/gui/dialog/confirm-dialog.component';
import { Course } from 'src/app/model/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { CourseService } from 'src/app/services/course.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'dashboard-my-courses',
  templateUrl: './dashboard-my-courses.component.html',
  styleUrls: ['./dashboard-my-courses.component.scss']
})
export class DashboardMyCoursesComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private chapterService: ChapterService,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private authService: AuthService) { }

  allDrafts: Observable<Course[]>;

  ngOnInit(): void {

    // this.authService.uid.pipe(first()).subscribe((uid: string) => {
    this.allDrafts =
      this.authService.uid().pipe(
        mergeMap((uid: string) => {
          return this.courseService.getDrafts(uid).pipe(
            map(drafts => {
              this.loaderService.hide();
              return drafts;
            }));
        }))
  }

  deleteCourse(courseid: string) {
    // Display modal "are you sure ?"
    const dialogref = this.dialogService.openDialog(
      ConfirmDialogComponent,
      {
        title: "Delete this course?",
        content: "<span class='font-semibold'>Are you sure you want to delete this course?</span><br><br> All its content will be deleted as well. <b>This action cannot be reverted</b>",
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
        // remove access for this course
        this.courseService.removeAllAccessForCourse(courseid).pipe(first()).toPromise().then(() => {
          // remove chapters
          return this.chapterService.deleteForCourse(courseid).pipe(first()).toPromise()
        }).then(() => {
          // remove course
          this.courseService.delete(courseid);
        })
      }
    })

  }

}
