import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/model/chapter.model';
import { Course } from 'src/app/model/course.model';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    private route: ActivatedRoute
  ) { }


  @Input()
  course: Course;

  @Input()
  chapters: Observable<Chapter[]>;

  @ViewChild('darkModeToggle', { static: true })
  darkModeToggle: ElementRef;



  ngAfterViewInit(): void {
    if (document.body.classList.contains('dark')) {
      this._setDark();
    }
  }

  goToCourse() {
    console.log(this.course);

  }

  darkMode() {
    this._setDark();
    const isDark = document.body.classList.toggle('dark');

    localStorage.setItem('nexify.darkmode', `${isDark}`);
  }

  private _setDark() {
    const darkModeButton = this.darkModeToggle.nativeElement as HTMLDivElement;
    darkModeButton.classList.toggle('-translate-x-5');
    darkModeButton.classList.toggle('text-myblue')
    darkModeButton.classList.toggle('text-mydarkblue-500')

    const bg = darkModeButton.parentElement as HTMLDivElement;
    bg.classList.toggle('bg-mydarkblue-200');
    bg.classList.toggle('bg-myblue');
  }

}
