import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubSink } from 'src/app/shared/utils/subsink.util';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditComponent implements OnInit {
  id?: number;
  editMode = false;

  private subs = new SubSink();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = !!params['id'];
    });
  }
}
