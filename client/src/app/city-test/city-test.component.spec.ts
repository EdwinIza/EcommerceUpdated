import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityTestComponent } from './city-test.component';

describe('CityTestComponent', () => {
  let component: CityTestComponent;
  let fixture: ComponentFixture<CityTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
