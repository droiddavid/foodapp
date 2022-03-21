import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmailAddressesComponent } from './profile-email-addresses.component';

describe('ProfileEmailAddressesComponent', () => {
  let component: ProfileEmailAddressesComponent;
  let fixture: ComponentFixture<ProfileEmailAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEmailAddressesComponent ],
	 imports: [ HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfileEmailAddressesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
});
