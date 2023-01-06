import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProfileModule } from '../features/profile-pages/profile/profile.module';


@NgModule({
	declarations: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		DashboardRoutingModule,
		HttpClientModule,
		ProfileModule,
	]
})
export class DashboardModule { }
