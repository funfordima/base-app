import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { LoadingSpinnerModule } from "../shared/loading-spinner/loading-spinner.module";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule, LoadingSpinnerModule, AuthRoutingModule, SharedModule],
})
export class AuthModule { }
