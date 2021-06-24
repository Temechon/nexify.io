import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { canActivate, redirectLoggedInTo, } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },

      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'login',
        component: LoginComponent,
        ...canActivate(() => redirectLoggedInTo(['home']))
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
      },
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
