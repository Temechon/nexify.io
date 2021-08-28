import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { CanAccessGuard } from '../guards/canAccess.guard';
import { CanAccessCourseGuard } from '../guards/canAccessCourse.guard';
import { ChapterResolver } from '../resolvers/chapter.resolver';
import { CourseResolver } from '../resolvers/course.resolver';
import { CourseComponent } from './course/course.component';
import { ChapterEditComponent } from './edit/chapter-edit/chapter-edit.component';
import { CourseHomeEditComponent } from './edit/course-home-edit/course-home-edit.component';
import { ChapterViewComponent } from './view/chapter-view/chapter-view.component';
import { CourseHomeViewComponent } from './view/course-home-view/course-home-view.component';

const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: ':name',
        children: [
            {
                path: '',
                component: CourseComponent,
                canActivate: [CanAccessCourseGuard],
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
                        canActivate: [CanAccessGuard],
                        ...canActivate(() => redirectUnauthorizedTo(['/login']))
                    },
                    {
                        path: ':chapter',
                        resolve: {
                            chapter: ChapterResolver,
                        },
                        children: [
                            {
                                path: '',
                                component: ChapterViewComponent
                            },
                            {
                                path: 'editor',
                                component: ChapterEditComponent,
                                ...canActivate(() => redirectUnauthorizedTo(['/login']))
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
