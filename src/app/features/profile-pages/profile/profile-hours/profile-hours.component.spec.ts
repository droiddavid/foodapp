import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHoursComponent } from './profile-hours.component';

describe('ProfileHoursComponent', () => {
  let component: ProfileHoursComponent;
  let fixture: ComponentFixture<ProfileHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
