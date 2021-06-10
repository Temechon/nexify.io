import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseEditComponent } from './course/edit/course-edit/course-edit.component';
import { HomeComponent } from './home/home.component';
import { CourseResolver } from './resolvers/course.resolver';
import { CourseViewComponent } from './course/view/course-view/course-view.component';

// const routes: Routes = [{
//   path: '',
//   redirectTo: 'home',
//   pathMatch: 'full',
// },
// {
//   path: 'home',
//   component: HomeComponent
// },
// {
//   path: 'course',
//   children: [
//     {
//       path: '',
//       redirectTo: '/home',
//       pathMatch: 'full'
//     },
//     {
//       path: ':id',
//       children: [
//         {
//           path: '',
//           component: CourseViewComponent,
//           resolve: {
//             course: CourseResolver,
//           }
//         },
//         {
//           path: 'editor',
//           component: CourseEditComponent
//         }
//       ],
//     },
//   ]
// }
// ];

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule),
      },
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
