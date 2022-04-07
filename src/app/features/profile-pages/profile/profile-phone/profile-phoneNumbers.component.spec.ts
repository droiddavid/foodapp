import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhoneComponent } from './profile-phoneNumbers.component';

describe('ProfilePhoneComponent', () => {
  let component: ProfilePhoneComponent;
  let fixture: ComponentFixture<ProfilePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
