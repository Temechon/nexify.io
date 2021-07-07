import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuiModule } from './gui/gui.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
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
