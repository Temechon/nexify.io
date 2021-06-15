import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseResolver } from '../resolvers/course.resolver';
import { StepResolver } from '../resolvers/step.resolver';
import { CourseHomeViewComponent } from './view/course-home-view/course-home-view.component';
import { CourseComponent } from './course/course.component';
import { CourseHomeEditComponent } from './edit/course-home-edit/course-home-edit.component';
import { StepEditComponent } from './edit/step-edit/step-edit.component';
import { StepViewComponent } from './view/step-view/step-view.component';

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
                component: CourseComponent,
                resolve: {
                    course: CourseResolver,
                },
                children: [
                    {
                        path: '',
                        component: CourseHomeViewComponent
                    },
                    {
                        path: 'editor',
                        component: CourseHomeEditComponent,
                    },
                    {
                        path: ':step',
                        resolve: {
                            step: StepResolver,
                        },
                        children: [
                            {
                                path: '',
                                component: StepViewComponent
                            },
                            {
                                path: 'editor',
                                component: StepEditComponent,
                            }
                        ]
                    }
                ]

            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
