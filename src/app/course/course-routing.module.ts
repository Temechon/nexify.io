import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseResolver } from '../resolvers/course.resolver';
import { StepResolver } from '../resolvers/step.resolver';
import { CourseHomeComponent } from './course-home/course-home.component';
import { CourseComponent } from './course.component';
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
        component: CourseComponent,
        children: [
            {
                path: '',
                component: CourseHomeComponent,
                outlet: 'course-outlet',
                resolve: {
                    course: CourseResolver,
                }
            },
            {
                path: ':step',
                resolve: {
                    step: StepResolver,
                },
                children: [
                    {
                        path: '',
                        component: StepViewComponent,
                        outlet: 'course-outlet'
                    },
                    {
                        path: 'editor',
                        children: [{
                            path: '',
                            component: StepEditComponent,
                            outlet: 'course-outlet'

                        }]
                    }
                ]
            },
            // {
            //     path: 'editor',
            //     component: StepEditComponent,
            //     resolve: {
            //         step: CourseResolver,
            //     }
            // }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
