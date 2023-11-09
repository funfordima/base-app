import { NgTemplateOutlet } from '@angular/common';
import { Directive, Injector, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngxTemplateOutlet]'
})
export class TemplateOutletTypeSafeDirective<T extends Object> extends NgTemplateOutlet {
  @Input('ngxTemplateOutlet') ngTemplateOutlet: TemplateRef<T> | null = null;

  @Input('ngxTemplateOutletContext') ngTemplateOutletContext: T | null = null;

  @Input('ngxTemplateOutletInjector') ngTemplateOutletInjector: Injector | null = null;
}
