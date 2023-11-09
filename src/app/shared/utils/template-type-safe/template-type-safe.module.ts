import { NgModule } from '@angular/core';

import { TemplateContextTypeSafeDirective } from './template-context-type-safe.directive';
import { TemplateOutletTypeSafeDirective } from './template-outlet-type-safe.directive';

@NgModule({
  declarations: [
    TemplateContextTypeSafeDirective,
    TemplateOutletTypeSafeDirective,
  ],
  exports: [
    TemplateContextTypeSafeDirective,
    TemplateOutletTypeSafeDirective,
  ]
})
export class TemplateTypeSafeModule {}
