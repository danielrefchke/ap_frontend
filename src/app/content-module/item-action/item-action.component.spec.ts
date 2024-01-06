import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActionComponent } from './item-action.component';

describe('ItemActionComponent', () => {
  let component: ItemActionComponent;
  let fixture: ComponentFixture<ItemActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
