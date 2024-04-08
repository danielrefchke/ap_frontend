import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconItemEditorComponent } from './icon-item-editor.component';

describe('IconItemEditorComponent', () => {
  let component: IconItemEditorComponent;
  let fixture: ComponentFixture<IconItemEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconItemEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
