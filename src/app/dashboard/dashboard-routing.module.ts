import { ProfileContactsComponent } from './../features/profile-pages/profile/profile-contacts/profile-contacts.component';
import { ProfileDeliveryComponent } from './../features/profile-pages/profile/profile-delivery/profile-delivery.component';
import { ProfilePrivacyComponent } from './../features/profile-pages/profile/profile-privacy/profile-privacy.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

//Route Guard
import { AuthGuard } from './../shared/guard/auth.guard';
import { ProfileComponent } from '../features/profile-pages/profile/profile.component';
import { ProfileEmailAddressesComponent } from '../features/profile-pages/profile/profile-email-addresses/profile-email-addresses.component';
import { ProfileAddressComponent } from '../features/profile-pages/profile/profile-addresses/profile-address.component';
import { ProfileInvitationsComponent } from '../features/profile-pages/profile/profile-invitations/profile-invitations.component';
import { ProfileOrdersComponent } from '../features/profile-pages/profile/profile-orders/profile-orders.component';

const routes: Routes = [	
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'privacy', component: ProfilePrivacyComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'delivery', component: ProfileDeliveryComponent },
	{ path: 'emails', component: ProfileEmailAddressesComponent },
	{ path: 'addresses', component: ProfileAddressComponent },
	{ path: 'contacts', component: ProfileContactsComponent },
	{ path: 'invitations', component: ProfileInvitationsComponent },
	{ path: 'orders', component: ProfileOrdersComponent },
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
