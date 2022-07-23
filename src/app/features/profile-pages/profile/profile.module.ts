import { AddressListItemComponent } from './../../../components/address-list-item/address-list-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ProfileDeliveryComponent } from './profile-delivery/profile-delivery.component';
import { AddDeliveryComponent } from './profile-delivery/add-delivery/add-delivery.component';
import { ProfilePhoneComponent } from './profile-phone/profile-phoneNumbers.component';
import { ProfilePhoneAddComponent } from './profile-phone/profile-phone-add/profile-phone-add.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileHoursComponent } from './profile-hours/profile-hours.component';
import { AddHoursComponent } from './profile-hours/add-hours/add-hours.component';
import { ProfilePhotosComponent } from './profile-photos/profile-photos.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileExpressComponent } from './profile-express/profile-express.component';
import { ProfileContactsComponent } from './profile-contacts/profile-contacts.component';
import { ProfileInvitationsComponent } from './profile-invitations/profile-invitations.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { EmailListItemComponent } from 'src/app/components/email-list-item/email-list-item.component';


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
		ProfileDeliveryComponent,
		AddDeliveryComponent,
		ProfilePhoneComponent,
		ProfilePhoneAddComponent,
		ProfileHoursComponent,
		AddHoursComponent,
		ProfilePhotosComponent,
		ProfileExpressComponent,
		ProfileContactsComponent,
		ProfileInvitationsComponent,
		ProfileOrdersComponent,
		EmailListItemComponent,
		AddressListItemComponent
	],
	imports: [
		FormsModule,
		CommonModule,
		ProfileRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		RouterModule,
		FontAwesomeModule,
		ImageCropperModule,
	],
	providers: []
})
export class ProfileModule { }
