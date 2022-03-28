import { UserComponent } from 'src/app/components/user/user.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { ProfileComponent } from '../profile.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile-add',
	templateUrl: './profile-add.component.html',
	styleUrls: ['./profile-add.component.css']
})

export class ProfileAddComponent implements OnInit {

	@ViewChild('toastElement')
	toastElement!: ElementRef;

	user!: UserComponent;
	Profile!: ProfileComponent;
	addForm!: FormGroup


	constructor(
		private database: DatabaseService,
		private formBuilder: FormBuilder,
		private router: Router) {

		this.addForm = this.formBuilder.group({
			firstName: 	['', [ Validators.required ]],
			lastName: 	['', [ Validators.required ]],
			company: 		['', [ Validators.required ]],
			displayName: 	['', [ Validators.required ]],
			website: 		['', [ Validators.required ]],
			description: 	['', [ Validators.maxLength(4096) ]],
			message: 		['', [ Validators.required ]],
			tagsString: 		['', [ Validators.required ]],
			hasDelivery: 	['', [ Validators.required ]],
			deliveryRange: ['', [ Validators.required ]],
			country: 		['', [ Validators.required ]]
		})
	}


	ngOnInit(): any {
		/* Declare local variables */
		let _localStorageProfile: string | null;


		/* 
			If there is no user, then 
				present error message then
				return to the home page.
		*/
		if (!localStorage.getItem('user')) {
			GlobalService.showToast(
				"Error: User account not found.",
				"btn-danger", 
				this.toastElement.nativeElement.id
			);
			this.router.navigate(['/', 'profile']);
		} else {
			this.user = JSON.parse(GlobalService.decode(localStorage.getItem('user')!));
		}


		/* Get the user's profile from localStorage */
		_localStorageProfile = localStorage.getItem('profile');
		if (_localStorageProfile) {
			this.router.navigate(['/', 'profile', 'profileEdit']);
		}
	}


	save() {
		this.database.getData("profiledata", "email", this.user.emailAddress)
			.subscribe((response) => {

				if(response.data.data) {
					GlobalService.showToast(
						"Notice: Profile already exists.  Use edit instead.",
						"btn-info", 
						this.toastElement.nativeElement.id
					);
					this.router.navigate(['/', 'profile', 'profileEdit']);
				}

				//The user does not already exist.
				if (response.data.length === 0) {

					//insert into DB
					let _profile = {
						"table": "profiledata",
						"company": this.addForm.controls['company'].value,
						"country": this.addForm.controls['country'].value,
						"deliveryRange": this.addForm.controls['deliveryRange'].value,
						"description": this.addForm.controls['description'].value,
						"firstName": this.addForm.controls['firstName'].value,
						"hasDelivery": this.addForm.controls['hasDelivery'].value,
						"lastName": this.addForm.controls['lastName'].value,
						"message": this.addForm.controls['message'].value,
						"tagsString": JSON.stringify(this.addForm.controls['tagsString'].value),
						"userId": this.user.id
					}
					this.database.insert(_profile)
						.subscribe((response) => {
							GlobalService.showToast(
								"Status: " + response.status + ". Message: " + response.message,
								"btn-success", 
								this.toastElement.nativeElement.id
							);


							//Deconstruct the profile object to remove the table and the userId
							let {
								company, country, deliveryRange, 
								description, firstName, hasDelivery, 
								lastName, message, tagsString,
							} = _profile;


							localStorage.setItem(
								"profile", 
								GlobalService.encode(
									JSON.stringify({
										company, country, deliveryRange, 
										description, firstName, hasDelivery, 
										lastName, message, tagsString,
									})
								)
							);
							this.router.navigate(['/', 'profile']);

						}); //end .subscribe
					}
					return response.data.data;

				}); //.subscribe((response) => {
	}

}