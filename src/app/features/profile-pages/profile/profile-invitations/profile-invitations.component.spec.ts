import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInvitationsComponent } from './profile-invitations.component';

describe('ProfileInvitationsComponent', () => {
  let component: ProfileInvitationsComponent;
  let fixture: ComponentFixture<ProfileInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInvitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
