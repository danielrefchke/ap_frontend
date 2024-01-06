import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEditorComponent } from './icon-editor.component';

describe('IconEditorComponent', () => {
  let component: IconEditorComponent;
  let fixture: ComponentFixture<IconEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
