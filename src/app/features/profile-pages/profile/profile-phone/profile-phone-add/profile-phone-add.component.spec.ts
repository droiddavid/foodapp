import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhoneAddComponent } from './profile-phone-add.component';

describe('ProfilePhoneAddComponent', () => {
  let component: ProfilePhoneAddComponent;
  let fixture: ComponentFixture<ProfilePhoneAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePhoneAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePhoneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
