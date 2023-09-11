import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerMessageComponent } from './spiner-message.component';

describe('SpinerMessageComponent', () => {
  let component: SpinerMessageComponent;
  let fixture: ComponentFixture<SpinerMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinerMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
