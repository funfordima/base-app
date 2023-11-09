import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { AlphabeticalListComponent } from './alphabetical-list.component';
import { AlphabeticalListItemContentDirective } from './utils/list-item-context.directive';
import { TemplateTypeSafeModule } from '../utils/template-type-safe/template-type-safe.module';

@NgModule({
    declarations: [
      AlphabeticalListComponent,
      AlphabeticalListItemContentDirective,
    ],
    imports: [
      CommonModule,
      MatListModule,
      TemplateTypeSafeModule,
    ],
    exports: [
      AlphabeticalListComponent,
      AlphabeticalListItemContentDirective,
    ]
})
export class AlphabeticalListModule {}
