import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExpressComponent } from './profile-express.component';

describe('ProfileExpressComponent', () => {
  let component: ProfileExpressComponent;
  let fixture: ComponentFixture<ProfileExpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileExpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
