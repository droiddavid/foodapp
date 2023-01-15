import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

//Auth Guard
//import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'verify-email-address', component: VerifyEmailComponent },
	{ path: '/', component: HomeComponent, },
	{ path: '', redirectTo: 'home', pathMatch: 'full'},
//	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }