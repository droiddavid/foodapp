import { DatabaseService } from './../../services/database/database.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';
import { ProfileComponent } from 'src/app/features/profile-pages/profile/profile.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit {

	@ViewChild('body') body!: ElementRef;
	@ViewChild('navbar') navbar!: ElementRef;
	@ViewChild('mpkFooter') mpkFooter!: ElementRef;


	user: any;
	Profile!: ProfileComponent;

	faChevronLeft = faChevronLeft;

	constructor(private database: DatabaseService, private router: Router) { }

	ngOnInit(): any {
		if(this.Profile === undefined) {
			this.initHelper();
		}
	}
	initHelper(): any {
		this.Profile = new ProfileComponent(this.database, this.router);

		/** Declare local variables  */
		let _localStorageUser: string | null;
		let _localStorageProfile: string | null;

		/* If there is no user, then return new Error */
		if (!localStorage.getItem('user')) {
			return new Error("Cannot find user in local storage.");
		}

		/* Get the user object from localStorage */
		_localStorageUser = localStorage.getItem('user');
		if (!this.user && _localStorageUser) {
			this.user = JSON.parse(GlobalService.decode(localStorage.getItem('user')!));
		}

		/* Get the user's profile from localStorage */
		_localStorageProfile = localStorage.getItem('profile');
		if (this.user && _localStorageUser && !_localStorageProfile) {
			this.database.getData("profiledata", "userId", this.user.id)
				.subscribe(data => {
					if (data) {
						if (data.data) {
							if (data.data[0]) {
								//this.Profile = data.data[0];

								//Update the Profile private fields.
								this.Profile.updateFields(data.data[0]);

								//Create a json object of the Profile fields.
								this.Profile.jsonProfile = {
									"firstName": this.Profile.firstName, 
									"lastName": this.Profile.lastName, 
									"company": this.Profile.company,
									"description": this.Profile.description, 
									"message": this.Profile.message, 
									"tagsString": this.Profile.tagsString, 
									"hasDelivery": this.Profile.hasDelivery,
									"deliveryRange": this.Profile.deliveryRange, 
									"country": this.Profile.country, 
									"displayName": this.Profile.displayName, 
									"website": this.Profile.website,
									"userId": this.Profile.userId
								};

								//Save the profile as a json object to localStorage
								localStorage.setItem(
									"profile", 
									GlobalService.encode(
										JSON.stringify(this.Profile.jsonProfile)
									)
								);
							}
						}
					} else {
						//Update the Profile private fields.
						this.Profile.updateFields(data.data[0]);

						//Create a json object of the Profile fields.
						this.Profile.jsonProfile = {
							"firstName": this.Profile.firstName, 
							"lastName": this.Profile.lastName, 
							"company": this.Profile.company,
							"description": this.Profile.description, 
							"message": this.Profile.message, 
							"tagsString": this.Profile.tagsString, 
							"hasDelivery": this.Profile.hasDelivery,
							"deliveryRange": this.Profile.deliveryRange, 
							"country": this.Profile.country, 
							"displayName": this.Profile.displayName, 
							"website": this.Profile.website,
							"userId": this.Profile.userId
						};

						//Save the profile as a json object to localStorage
						localStorage.setItem(
							"profile", 
							GlobalService.encode(
								JSON.stringify(this.Profile.jsonProfile)
							)
						);
					}
				})
		}
	}
}