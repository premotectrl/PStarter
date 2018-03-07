import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMarkerComponent } from './chart-marker.component';

describe('ChartMarkerComponent', () => {
  let component: ChartMarkerComponent;
  let fixture: ComponentFixture<ChartMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
