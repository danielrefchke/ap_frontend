import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextItemEditorComponent } from './text-item-editor.component';

describe('TextItemEditorComponent', () => {
  let component: TextItemEditorComponent;
  let fixture: ComponentFixture<TextItemEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextItemEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
