import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Chapter } from 'src/app/model/chapter.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'chapter-view',
  templateUrl: './chapter-view.component.html',
  styleUrls: ['./chapter-view.component.scss']
})
export class ChapterViewComponent implements OnInit {


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  chapter: Chapter;
  private toDestroy: Array<Subscription> = [];
  isLoggedIn: Observable<boolean>;

  ngOnInit(): void {
    this.toDestroy.push(this.route.data.subscribe((data) => {
      this.chapter = data.chapter;
    })
    )

    this.isLoggedIn = this.authService.isLoggedIn();
  }

  goToNextChapter() {
    const courseid = this.route.parent.parent.snapshot.data.course.name;
    this.router.navigate(['/course', courseid, this.chapter.nextChapterId]).then(() => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })

  }
  goToPreviousChapter() {
    const courseid = this.route.parent.parent.snapshot.data.course.name;
    this.router.navigate(['/course', courseid, this.chapter.previousChapterId]).then(() => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })
  }

  ngOnDestroy() {
    this.toDestroy.map(sub => sub.unsubscribe());
    this.toDestroy = [];
  }

}
