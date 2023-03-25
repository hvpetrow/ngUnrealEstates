import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEstatesComponent } from './all-estates.component';

describe('AllEstatesComponent', () => {
  let component: AllEstatesComponent;
  let fixture: ComponentFixture<AllEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEstatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
