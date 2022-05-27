import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParametrizacionComponent } from './modal-parametrizacion.component';

describe('ModalParametrizacionComponent', () => {
  let component: ModalParametrizacionComponent;
  let fixture: ComponentFixture<ModalParametrizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParametrizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParametrizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
