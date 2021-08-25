import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'sidebar-courses',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarCoursesComponent extends SidebarComponent {

  constructor(
    route: ActivatedRoute
  ) {
    super(route);
  }

  categories: any[] = [
  ]
}
