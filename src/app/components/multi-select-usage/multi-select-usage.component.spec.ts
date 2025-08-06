import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectUsageComponent } from './multi-select-usage.component';

describe('MultiSelectUsageComponent', () => {
  let component: MultiSelectUsageComponent;
  let fixture: ComponentFixture<MultiSelectUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
