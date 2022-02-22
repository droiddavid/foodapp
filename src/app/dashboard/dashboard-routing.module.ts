import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../features/profile/profile.component';
import { DashboardComponent } from './dashboard.component';



const routes: Routes = [
	{
		path: '',
		component: DashboardComponent
	}
	,
	{
		path: 'profile',
		component: ProfileComponent
	}
	//,
	// {
	// 	path: 'signup',
	// 	component: SignupComponent
	// }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
