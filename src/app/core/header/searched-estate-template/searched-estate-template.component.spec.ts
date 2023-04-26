import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedEstateTemplateComponent } from './searched-estate-template.component';

describe('SearchedEstateTemplateComponent', () => {
  let component: SearchedEstateTemplateComponent;
  let fixture: ComponentFixture<SearchedEstateTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedEstateTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedEstateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
