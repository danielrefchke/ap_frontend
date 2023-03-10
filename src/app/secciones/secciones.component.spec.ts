import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionesComponent } from './secciones.component';

describe('SeccionesComponent', () => {
  let component: SeccionesComponent;
  let fixture: ComponentFixture<SeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
