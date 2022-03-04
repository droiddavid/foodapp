import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'signin',
		component: SigninComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
