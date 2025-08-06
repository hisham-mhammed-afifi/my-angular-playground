import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionPlayComponent } from './change-detection-play.component';

describe('ChangeDetectionPlayComponent', () => {
  let component: ChangeDetectionPlayComponent;
  let fixture: ComponentFixture<ChangeDetectionPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDetectionPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeDetectionPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
