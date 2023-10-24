import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePeritajeComponent } from './home-peritaje.component';

describe('HomePeritajeComponent', () => {
  let component: HomePeritajeComponent;
  let fixture: ComponentFixture<HomePeritajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePeritajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePeritajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
