import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardMyCoursesComponent } from './dashboard-my-courses/dashboard-my-courses.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [

    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                path: 'home',
                component: DashboardHomeComponent
            },
            {
                path: 'mycourses',
                component: DashboardMyCoursesComponent

            },
            {
                path: 'bookmarks',
                // component: DashboardHomeComponent

            }
        ]
        // redirectTo: 'home'
    },




    // {
    //     path: 'home',
    //     children: [
    //         {
    //             path: '',
    //             component: DashboardHomeComponent
    //         }
    //     ]
    // },
    // {
    //     path: 'mycourses',
    //     component: DashboardHomeComponent
    // },
    // {
    //     path: 'bookmarks',
    //     component: DashboardComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
