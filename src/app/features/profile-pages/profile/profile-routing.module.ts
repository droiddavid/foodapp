import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePrivacyComponent } from './profile-privacy/profile-privacy.component';
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
	},
	{
		path: 'profilePrivate',
		component: ProfilePrivacyComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
