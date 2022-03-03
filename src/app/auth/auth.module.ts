import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './../services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

//Firebase services
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


@NgModule({
	declarations: [
		SigninComponent,
		SignupComponent,
		ForgotPasswordComponent,
		VerifyEmailComponent
	],
	imports: [
		Router,
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		HttpClientModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
	],
	providers: [AuthService]
})
export class AuthModule { }