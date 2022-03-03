import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
	declarations: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		DashboardRoutingModule,
		FontAwesomeModule,
		HttpClientModule,
	]
})
export class DashboardModule { }
