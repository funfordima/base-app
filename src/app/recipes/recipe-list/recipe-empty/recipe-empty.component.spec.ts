import type { ComponentFixture} from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { RecipeEmptyComponent } from './recipe-empty.component';

describe('RecipeEmtyComponent', () => {
  let component: RecipeEmptyComponent;
  let fixture: ComponentFixture<RecipeEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeEmptyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
