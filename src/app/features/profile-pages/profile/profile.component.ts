import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, DoCheck } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from './../../../services/global.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck {

	@ViewChild('body') body!: ElementRef;

	
	firstName!: string;
	lastName!: string; 
	company!: string;
	description!: string;
	message!: string;
	tagsString!: string;
	hasDelivery!: boolean;
	deliveryRange!: number;
	country!: string;
	displayName!: string;
	website!: string;



	Profile = {
		"firstName" : "",
		"lastName" : "", 
		"company" : "",
		"description" : "",
		"message" : "",
		"tagsString" : "",
		"hasDelivery" : "",
		"deliveryRange" : "",
		"country" : ""
	};


	user: any;
	
	
	constructor(private database: DatabaseService, private router: Router) { }

	ngOnInit(): any {

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
		debugger;
		if (this.user && _localStorageUser && !_localStorageProfile) {
			this.database.getData("profiledata", "userId", this.user.id)
				.subscribe(data => {
					debugger;
					if (data && data.data && data.data.length > 0) {
						this.Profile = data.data[0];
						localStorage.setItem("profile", GlobalService.encode(JSON.stringify(this.Profile)));
					} else {
						this.router.navigate(['/', 'profile', 'profileAdd']);
					}
				})
		} else {
			debugger;
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

	ngDoCheck(): any {}

	displayEditForm(): void {
		console.log("displaying edit form");
	}

}
