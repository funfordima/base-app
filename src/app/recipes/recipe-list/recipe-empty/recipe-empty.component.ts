import { ChangeDetectionStrategy,Component } from '@angular/core';

@Component({
  selector: 'app-recipe-emty',
  templateUrl: './recipe-empty.component.html',
  styleUrls: ['./recipe-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEmptyComponent {
}
