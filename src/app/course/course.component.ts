import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';

@Component({
    selector: 'course',
    templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {

    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    constructor(private router: Router
    ) { }

    ngOnInit(): void {
        this.router.events.subscribe(e => {
            // console.log(e.snapshot.outlet)
            if (e instanceof ActivationStart && e.snapshot.outlet === "course-outlet")
                this.outlet.deactivate();
        });

    }

}
