import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RouterModule } from '@angular/router';
import { ProfilePrivacyComponent } from './profile-privacy/profile-privacy.component';
import { ProfileAddressComponent } from './profile-addresses/profile-address.component';
import { ProfileEmailAddressesComponent } from './profile-email-addresses/profile-email-addresses.component';
import { AddEmailAddressComponent } from './profile-email-addresses/add-email-address/add-email-address.component';
import { AddAddressComponent } from './profile-addresses/add-address/add-address.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
	declarations: [
		ProfileComponent,
		ProfileAddComponent,
		ProfileEditComponent,
		ProfilePrivacyComponent,
		ProfileAddressComponent,
		ProfileEmailAddressesComponent,
  AddEmailAddressComponent,
  AddAddressComponent,
  ProfileMenuComponent,
	],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		RouterModule,
	]
})
export class ProfileModule { }
