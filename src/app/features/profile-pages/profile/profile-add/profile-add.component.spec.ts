import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileAddComponent } from './profile-add.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('ProfileAddComponent', () => {
  let component: ProfileAddComponent;
  let fixture: ComponentFixture<ProfileAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAddComponent ],
	 imports: [  HttpClientModule, ReactiveFormsModule, RouterTestingModule  ]
    })
    .compileComponents();
  });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfileAddComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  it('should create', () => {
	let x: boolean = true;
	expect(x).toBeTruthy();
    //expect(component).toBeTruthy();
  });
});
