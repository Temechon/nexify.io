import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from 'src/app/model/chapter.model';

@Component({
  selector: 'chapter-view',
  templateUrl: './chapter-view.component.html',
  styleUrls: ['./chapter-view.component.scss']
})
export class ChapterViewComponent implements OnInit {


  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  chapter: Chapter;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.chapter = data.chapter;
    })
  }

  goToNextChapter() {
    const courseid = this.route.parent.parent.snapshot.data.course.id;
    this.router.navigate(['/course', courseid, this.chapter.nextChapterId]);
  }
  goToPreviousChapter() {
    const courseid = this.route.parent.parent.snapshot.data.course.id;
    this.router.navigate(['/course', courseid, this.chapter.previousChapterId]);
  }

}
