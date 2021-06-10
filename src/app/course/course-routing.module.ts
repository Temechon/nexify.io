import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseResolver } from '../resolvers/course.resolver';
import { StepResolver } from '../resolvers/step.resolver';
import { CourseHomeComponent } from './course-home/course-home.component';
import { CourseEditComponent } from './edit/course-edit/course-edit.component';
import { CourseViewComponent } from './view/course-view/course-view.component';

const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: ':id',
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: CourseHomeComponent,
                resolve: {
                    course: CourseResolver,
                }
            },
            {
                path: ':step',
                component: CourseViewComponent,
                resolve: {
                    course: StepResolver,
                }
            },
            {
                path: 'editor',
                component: CourseEditComponent,
                resolve: {
                    course: CourseResolver,
                }
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
