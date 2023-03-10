import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionEditorComponent } from './seccion-editor.component';

describe('SeccionEditorComponent', () => {
  let component: SeccionEditorComponent;
  let fixture: ComponentFixture<SeccionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
