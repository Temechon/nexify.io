import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuiModule } from './gui/gui.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user-login/login/login.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SubscribeComponent } from './user-login/subscribe/subscribe.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { ResetPasswordComponent } from './user-login/reset-password/reset-password.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PrivacyPolicyComponent,
    SubscribeComponent,
    CoursesListComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GuiModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatomoModule.forRoot(environment.matomo),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
