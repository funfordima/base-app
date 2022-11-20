import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { LoadingSpinnerModule } from "../shared/loading-spinner/loading-spinner.module";
import { AuthRoutingModule } from "./aut-routing.module";
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule, LoadingSpinnerModule, AuthRoutingModule],
})
export class AuthModule { }
