import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePrivacyComponent } from './profile-privacy/profile-privacy.component';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile.component';
import { ProfileAddressComponent } from './profile-addresses/profile-address.component';
import { ProfileEmailAddressesComponent } from './profile-email-addresses/profile-email-addresses.component';
import { AddEmailAddressComponent } from './profile-email-addresses/add-email-address/add-email-address.component';
import { AddAddressComponent } from './profile-addresses/add-address/add-address.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';


const routes: Routes = [
	{
		path: '',
		component: ProfileMenuComponent
	},
	{	path: 'profile',
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
	},
	{
		path: 'profileEmailAddresses',
		component: ProfileEmailAddressesComponent
	},
	{
		path: 'addEmailAddress',
		component: AddEmailAddressComponent
	},
	{
		path: 'profileAddresses',
		component: ProfileAddressComponent
	},
	{
		path: 'addAddress',
		component: AddAddressComponent
	}
];

/*
profileDelivery
profileHours
profilePhoneNumbers
profilePhotos
profileExpress
*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
