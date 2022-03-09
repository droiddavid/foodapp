import { Component, DoCheck, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, DoCheck {

	user: any;
	Profile: any = {
		"firstName": undefined,
		"lastName": undefined,
		"company": undefined,
		"displayName": undefined,
		"website": undefined,
		"description": undefined,
		"message": undefined,				
		"tags": undefined,
		"hasDelivery": undefined,
		"deliveryRange": undefined,
		"country": undefined
	}
	editForm!: FormGroup;

	constructor(private database: DatabaseService, private formBuilder: FormBuilder) {

		this.editForm = this.formBuilder.group({
			firstName: 	['', [ Validators.required ]],
			lastName: 	['', [ Validators.required ]],
			company: 		['', [ Validators.required ]],
			displayName: 	['', [ Validators.required ]],
			website: 		['', [ Validators.required ]],
			description: 	['', [ Validators.maxLength(4096) ]],
			message: 		['', [ Validators.required ]],
			tags: 		['', [ Validators.required ]],
			hasDelivery: 	['', [ Validators.required ]],
			deliveryRange: ['', [ Validators.required ]],
			country: 		['', [ Validators.required ]]
		})
	}

	ngOnInit(): void {
	}


	ngDoCheck(): any {

		/* Declare local variables */
		let _localStorageUser: string | null;
		let _localStorageProfile: string | null;


		/* If there is no user, then return new Error */
		if (!localStorage.getItem('user')) {
			return new Error("Cannot find user in local storage.");
		}


		/* Get the user object from localStorage */
		_localStorageUser = localStorage.getItem('user');
		if (!this.user && _localStorageUser) {
			let lsUser = localStorage.getItem('user')!;
			if (lsUser) {
				let decodedUser = GlobalService.decode(lsUser);
				if (decodedUser) {
					this.user = JSON.parse(decodedUser);		
				}
			}
		}


		/* Get the user's profile from localStorage */
		_localStorageProfile = localStorage.getItem('profile');
		if (this.user && _localStorageUser && !_localStorageProfile) {
			this.database.getData("profiledata", "userId", this.user.id)
				.subscribe(data => {
					this.Profile = data.data[0];
					
					localStorage.setItem("profile", GlobalService.encode(JSON.stringify(this.Profile)));
				})
		} else {
			//The localStorage profile exists
			let profile = localStorage.getItem('profile')!;

			if (profile) {
				//Decode the profile into JSON.
				let decodedProfile = GlobalService.decode(profile);
				if (decodedProfile) {
					//Assign the JSON object to the Profile object.
					this.Profile = JSON.parse(decodedProfile);
				}
			}
		}
	}

	onSubmit(): any {}
	checkHasDelivery(): any {}
}