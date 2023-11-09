import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnChanges,
  TemplateRef,
} from '@angular/core';

import { AlphabeticalListItemContentDirective } from './utils/list-item-context.directive';
import { AlphabeticalListItemContext } from './models/item-context.interface';

@Component({
  selector: 'alphabetical-list',
  templateUrl: './alphabetical-list.component.html',
  styleUrls: ['./alphabetical-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabeticalListComponent<T> implements OnChanges {
  @Input() data!: T[];

  @Input() itemLabelHandler: (item: T) => string = (item: unknown) => '';

  @ContentChild(AlphabeticalListItemContentDirective, { read: TemplateRef })
  readonly listItemContentTemplate: TemplateRef<AlphabeticalListItemContext<T>> | undefined;

  letters!: string[];
  sectionMap!: Map<string, T[]>;

  ngOnChanges(): void {
    this.initSectionMap(this.data);
    this.initLetters();
  }

  private initSectionMap(data: T[]): void {
    this.sectionMap = new Map();

    data.forEach((item) => {
      const key = this.extractFirstLetterFromLabel(item);
      const value = (this.sectionMap.get(key) ?? []);

      value.push(item);
      this.sectionMap.set(key, value);
    });
  }

  private initLetters(): void {
    this.letters = [...this.sectionMap.keys()];
  }

  private extractFirstLetterFromLabel(item: T): string {
    const label = this.itemLabelHandler(item);
    const firstLetter = label[0].toUpperCase();

    return firstLetter;
  }
}
