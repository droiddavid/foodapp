import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmailAddressesComponent } from './profile-email-addresses.component';

describe('ProfileEmailAddressesComponent', () => {
  let component: ProfileEmailAddressesComponent;
  let fixture: ComponentFixture<ProfileEmailAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEmailAddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEmailAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
