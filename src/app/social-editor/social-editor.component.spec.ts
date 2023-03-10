import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialEditorComponent } from './social-editor.component';

describe('SocialEditorComponent', () => {
  let component: SocialEditorComponent;
  let fixture: ComponentFixture<SocialEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
