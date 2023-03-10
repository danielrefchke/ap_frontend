import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserEditorComponent } from './list-user-editor.component';

describe('ListUserEditorComponent', () => {
  let component: ListUserEditorComponent;
  let fixture: ComponentFixture<ListUserEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
