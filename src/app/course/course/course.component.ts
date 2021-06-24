import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/model/chapter.model';
import { Course } from 'src/app/model/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChapterService } from 'src/app/services/chapter.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course: Course;
  chapters: Observable<Chapter[]>;

  constructor(
    private route: ActivatedRoute,
    private chapterService: ChapterService) { }

  ngOnInit(): void {

    this.course = this.route.snapshot.data.course
    console.log("SIDEBAR --- Course:", this.course);

    // get all chapters for this course
    this.chapters = this.chapterService.getAll(this.course.id)
  }

}
