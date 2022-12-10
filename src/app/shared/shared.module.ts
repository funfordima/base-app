import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DropDownDirective } from "./utils/drop-down.directive";
import { PlaceholderDirective } from "./utils/placeholder.directive";

@NgModule({
  declarations: [DropDownDirective, PlaceholderDirective],
  imports: [CommonModule],
  exports: [DropDownDirective, PlaceholderDirective],
})
export class SharedModule { }
