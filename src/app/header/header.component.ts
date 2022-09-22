import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  @Output() featureSelected = new EventEmitter<string>();

  collapsed = false;

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }
}
