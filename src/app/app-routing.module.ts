import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanAccessGuard } from './guards/canAccess.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

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
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
      },
      {
        path: 'dashboard',
        canActivate: [CanAccessGuard],
        // ...canActivate(() => redirectUnauthorizedTo(['/login']))
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
