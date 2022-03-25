import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeliveryComponent } from './profile-delivery.component';

describe('ProfileDeliveryComponent', () => {
  let component: ProfileDeliveryComponent;
  let fixture: ComponentFixture<ProfileDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
