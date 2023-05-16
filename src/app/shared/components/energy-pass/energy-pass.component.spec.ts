import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyPassComponent } from './energy-pass.component';

describe('EnergyPassComponent', () => {
  let component: EnergyPassComponent;
  let fixture: ComponentFixture<EnergyPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
