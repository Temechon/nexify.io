import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseResolver } from '../resolvers/course.resolver';
import { StepResolver } from '../resolvers/step.resolver';
import { CourseHomeComponent } from './course-home/course-home.component';
import { CourseComponent } from './course/course.component';
import { StepEditComponent } from './edit/course-edit/step-edit.component';
import { StepViewComponent } from './view/course-view/step-view.component';

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
                        component: CourseHomeComponent
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
