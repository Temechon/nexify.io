import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor(private courseService: CourseService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createCourse() {
    const displayName = this.authService.userData.displayName;
    this.courseService.create({
      author: displayName,
      published: false

    }).then((course: DocumentReference) => {
      // Create an access for the connected user
      this.authService.uid.pipe(first()).subscribe((uid: string) => {
        this.courseService.addAccess(course.id, uid, "author");
      })
      // Update the course name
      this.courseService.update({ id: course.id, name: course.id }).then(() => {
        this.router.navigate(['/course', course.id, 'editor']);
      })

    })
  }

}
