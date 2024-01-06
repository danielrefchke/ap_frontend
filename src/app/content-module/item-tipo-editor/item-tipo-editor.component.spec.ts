import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTipoEditorComponent } from './item-tipo-editor.component';

describe('ItemTipoEditorComponent', () => {
  let component: ItemTipoEditorComponent;
  let fixture: ComponentFixture<ItemTipoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTipoEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTipoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
