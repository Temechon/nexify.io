import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GuiModule } from "../gui/gui.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardHomeComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        DashboardRoutingModule,
        GuiModule

    ],
    entryComponents: []

})
export class DashboardModule { }
