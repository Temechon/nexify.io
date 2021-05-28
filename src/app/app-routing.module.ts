import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseEditComponent } from './edit/course-edit/course-edit.component';
import { CourseViewComponent } from './view/course-view/course-view.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'course',
  children: [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: ':id',
      children: [
        {
          path: '',
          component: CourseViewComponent,
          // resolve: {
          //   note: CourseResolver, 
          // }
        },
        {
          path: 'editor',
          component: CourseEditComponent
        }
      ],
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
