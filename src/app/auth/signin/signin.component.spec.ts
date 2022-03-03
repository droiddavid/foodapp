import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [ SigninComponent ],
		imports: [
			RouterTestingModule,
			RouterModule,
			AngularFireModule.initializeApp(environment.firebase),
			AngularFireAuthModule,
			AngularFirestoreModule,
			ReactiveFormsModule,
			HttpClientModule,
			RouterTestingModule,
		],
		providers: [DatabaseService,  AuthService,],
		})
	.compileComponents();
});

	beforeEach(() => {
		fixture = TestBed.createComponent(SigninComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
