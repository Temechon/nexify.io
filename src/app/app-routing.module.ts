import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CanAccessGuard } from './guards/canAccess.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user-login/login/login.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ResetPasswordComponent } from './user-login/reset-password/reset-password.component';
import { SubscribeComponent } from './user-login/subscribe/subscribe.component';

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
        path: 'policy',
        component: PrivacyPolicyComponent,
      },

      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'subscribe',
        component: SubscribeComponent
      },

      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
      },
      {
        path: 'courses',
        component: CoursesListComponent
      },
      {
        path: 'dashboard',
        canActivate: [CanAccessGuard],
        // ...canActivate(() => redirectUnauthorizedTo(['/login']))
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      {
        path: '**',
        redirectTo: 'home'
      },
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
