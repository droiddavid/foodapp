import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { ReactiveFormsModule } from '@angular/forms';



import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';


@NgModule({
	declarations: [
		ProfileComponent,
		ProfileAddComponent,
		ProfileEditComponent
	],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
	]
})
export class ProfileModule { }
