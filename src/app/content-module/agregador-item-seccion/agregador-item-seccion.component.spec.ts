import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregadorItemSeccionComponent } from './agregador-item-seccion.component';

describe('AgregadorItemSeccionComponent', () => {
  let component: AgregadorItemSeccionComponent;
  let fixture: ComponentFixture<AgregadorItemSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregadorItemSeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregadorItemSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
