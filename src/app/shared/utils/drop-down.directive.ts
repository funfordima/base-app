import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  @HostBinding('class.open') private isOpen = false;

  constructor(private readonly elementRef: ElementRef) { }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event): void {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

}
