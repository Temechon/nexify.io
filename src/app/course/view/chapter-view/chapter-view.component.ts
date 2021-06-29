import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private toDestroy: Array<Subscription> = [];

  ngOnInit(): void {
    this.toDestroy.push(this.route.data.subscribe((data) => {
      this.chapter = data.chapter;
    })
    )
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  goToNextChapter() {
    const courseid = this.route.parent.parent.snapshot.data.course.id;
    this.router.navigate(['/course', courseid, this.chapter.nextChapterId]);
  }
  goToPreviousChapter() {
    const courseid = this.route.parent.parent.snapshot.data.course.id;
    this.router.navigate(['/course', courseid, this.chapter.previousChapterId]);
  }

  ngOnDestroy() {
    this.toDestroy.map(sub => sub.unsubscribe());
    this.toDestroy = [];
  }

}
