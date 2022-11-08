import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-delivery-tooltip',
  templateUrl: './delivery-tooltip.component.html',
  styleUrls: ['./delivery-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryTooltipComponent { }
