import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/model/chapter.model';
import { Course } from 'src/app/model/course.model';
import { ChapterService } from 'src/app/services/chapter.service';

@Component({
  selector: 'course-home-view',
  templateUrl: './course-home-view.component.html',
  styleUrls: ['./course-home-view.component.scss']
})
export class CourseHomeViewComponent implements OnInit {


  course: Course;
  chapters: Observable<Chapter[]>;
  firstChapter: Chapter;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chapterService: ChapterService
  ) { }

  ngOnInit(): void {

    this.course = this.route.snapshot.data.course;
    // get all chapters for this course
    this.chapters = this.chapterService.getAll(this.course.id);

    this.chapters.subscribe(chaps => {
      console.log("COURSE HOME VIEW --- First chapter:", chaps[0]);
      this.firstChapter = chaps[0];
    });
  }

  startCourse() {
    if (this.firstChapter) {
      this.router.navigate(['course', this.course.id, this.firstChapter.id])
    }
  }

}
