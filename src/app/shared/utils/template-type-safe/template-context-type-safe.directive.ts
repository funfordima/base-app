import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxTemplateContextType]'
})
export class TemplateContextTypeSafeDirective<T> {
  @Input() set ngxTemplateContextType(type: T) {};

  static ngTemplateContextGuard<T>(
    directive: TemplateContextTypeSafeDirective<T>,
    context: unknown,
  ): context is T {
    return true;
  }
}
