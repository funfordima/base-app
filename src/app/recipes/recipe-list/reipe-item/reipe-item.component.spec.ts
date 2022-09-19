import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReipeItemComponent } from './reipe-item.component';

describe('ReipeItemComponent', () => {
  let component: ReipeItemComponent;
  let fixture: ComponentFixture<ReipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReipeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
