import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuiModule } from './gui/gui.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuiModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
