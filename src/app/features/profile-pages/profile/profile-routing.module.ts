import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
	{	path: '',
		component: ProfileComponent
	},
	{
		path: 'profileEdit',
		component: ProfileEditComponent
	},
	{
		path: 'profileAdd',
		component: ProfileAddComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
