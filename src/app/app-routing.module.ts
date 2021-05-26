import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseViewComponent } from './course-view/course-view.component';
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
          path: ':stepid',
          component: CourseViewComponent
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
