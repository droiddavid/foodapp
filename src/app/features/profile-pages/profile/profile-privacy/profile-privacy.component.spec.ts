import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePrivacyComponent } from './profile-privacy.component';

describe('ProfilePrivacyComponent', () => {
  let component: ProfilePrivacyComponent;
  let fixture: ComponentFixture<ProfilePrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePrivacyComponent ],
	 imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfilePrivacyComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
});
