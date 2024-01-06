import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphItemEditorComponent } from './graph-item-editor.component';

describe('GraphItemEditorComponent', () => {
  let component: GraphItemEditorComponent;
  let fixture: ComponentFixture<GraphItemEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphItemEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
