import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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


  /**
   * Optionnal : the course currently displayed
   */
  @Input()
  course: Course;

  /** Optionnal : the list of chapters of the given course */
  @Input()
  chapters: Observable<Chapter[]>;

  @ViewChild('darkModeToggle', { static: true })
  darkModeToggle: ElementRef;

  dashboardCategories = [
    {
      url: 'bookmarks',
      name: 'My bookmarks',
      icon: 'fa-bookmark'
    },
    {
      url: 'mycourses',
      name: 'My courses',
      icon: 'fa-graduation-cap'
    }
  ]



  ngAfterViewInit(): void {
    if (document.body.classList.contains('dark')) {
      this._setDark();
    }
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    if (document.body.clientWidth < 1024) {
      this._hideSidebar();
    }
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

  _hideSidebar() {
    const sidebar = document.querySelector('#sidebar-content') as HTMLDivElement;
    sidebar.classList.add('w-0')
    sidebar.classList.remove('w-80')
    sidebar.classList.add('small')

    const chevron = sidebar.querySelector('#sidebar-chevron') as HTMLDivElement;
    chevron.classList.remove('right-5')
    chevron.classList.remove('text-gray-200')
    chevron.classList.add('-right-10')
    chevron.classList.add('text-mydarkblue-500')

    const icon = chevron.querySelector('i') as HTMLLIElement;
    icon.classList.add('rotate-180')
  }

  toggleSidebar() {
    const sidebar = document.querySelector('#sidebar-content') as HTMLDivElement;
    if (sidebar.classList.contains('small')) {
      this._showSidebar()
    } else {
      this._hideSidebar();
    }
  }

  _showSidebar() {
    const sidebar = document.querySelector('#sidebar-content') as HTMLDivElement;
    sidebar.classList.add('w-80')
    sidebar.classList.remove('w-0')
    sidebar.classList.remove('small')

    const chevron = sidebar.querySelector('#sidebar-chevron') as HTMLDivElement;
    chevron.classList.add('right-5')
    chevron.classList.add('text-gray-200')
    chevron.classList.remove('-right-10')
    chevron.classList.remove('text-mydarkblue-500')

    const icon = chevron.querySelector('i') as HTMLLIElement;
    icon.classList.remove('rotate-180')
  }

}
