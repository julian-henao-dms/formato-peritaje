import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoPeritajeComponent } from './formato-peritaje.component';

describe('FormatoPeritajeComponent', () => {
  let component: FormatoPeritajeComponent;
  let fixture: ComponentFixture<FormatoPeritajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatoPeritajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoPeritajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
