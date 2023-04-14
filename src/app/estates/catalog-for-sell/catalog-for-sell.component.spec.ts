import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogForSellComponent } from './catalog-for-sell.component';

describe('CatalogForSellComponent', () => {
  let component: CatalogForSellComponent;
  let fixture: ComponentFixture<CatalogForSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogForSellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogForSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
