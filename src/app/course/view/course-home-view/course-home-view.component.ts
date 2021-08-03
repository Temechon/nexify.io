import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Chapter } from 'src/app/model/chapter.model';
import { Course } from 'src/app/model/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { PDFService } from 'src/app/services/pdf.service';

@Component({
  selector: 'course-home-view',
  templateUrl: './course-home-view.component.html',
  styleUrls: ['./course-home-view.component.scss']
})
export class CourseHomeViewComponent implements OnInit {


  course: Course;
  chapters: Observable<Chapter[]>;
  allChapters: Array<Chapter>;

  firstChapter: Chapter;

  private toDestroy: Array<Subscription> = [];

  isLoggedIn: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chapterService: ChapterService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.course = this.route.snapshot.data.course;
    // get all chapters for this course
    this.chapters = this.chapterService.getAll(this.course.id);

    this.toDestroy.push(this.chapters.subscribe(chaps => {
      this.allChapters = chaps;
      console.log("COURSE HOME VIEW --- First chapter:", chaps[0]);
      this.firstChapter = chaps[0];
    }));

    this.isLoggedIn = this.authService.isLoggedIn();
    // this.chapters.pipe(first()).subscribe(d => this.download());

  }

  startCourse() {
    if (this.firstChapter) {
      this.router.navigate(['course', this.course.name, this.firstChapter.id])
    }
  }

  ngOnDestroy() {
    this.toDestroy.map(sub => sub.unsubscribe());
    this.toDestroy = [];
  }

  download() {

    // Retrieve all chapter content
    const getAllCodes = this.allChapters.map((chap: Chapter) => {
      return this.chapterService.get(this.course.id, chap.id).pipe(first());
    })

    forkJoin(getAllCodes)
      .pipe(first())
      .subscribe(
        allChapters => PDFService.createPDF(this.course, allChapters)
      );
  }

}
