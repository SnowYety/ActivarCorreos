import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaLimiteComponent } from './fecha-limite.component';

describe('FechaLimiteComponent', () => {
  let component: FechaLimiteComponent;
  let fixture: ComponentFixture<FechaLimiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechaLimiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaLimiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
