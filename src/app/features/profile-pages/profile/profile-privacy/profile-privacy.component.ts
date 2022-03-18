import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { ProfileComponent } from 'src/app/features/profile-pages/profile/profile.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-profile-privacy',
  templateUrl: './profile-privacy.component.html',
  styleUrls: ['./profile-privacy.component.css']
})


export class ProfilePrivacyComponent implements OnInit {

	@ViewChild('privacyMessage') privacyMessage!: ElementRef;
	@ViewChild('toastElement') toastElement!:ElementRef;

	faChevronLeft = faChevronLeft;
	faChevronRight = faChevronRight;

	user: any;
	Profile!: ProfileComponent;
	btnUpdateProfile:any;
	updateTable: string = "profiledata";


	constructor(private database: DatabaseService, private router: Router) {} //constructor


	ngOnInit(): any {

		if(this.Profile === undefined) {

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
			if (this.user && _localStorageUser && (_localStorageProfile === undefined || _localStorageProfile === null)) {
				this.database.getData("profiledata", "userId", this.user.id).subscribe(data => {

					if(data && data.data && data.data[0]) {

						//Update the Profile private fields.
						this.Profile.updateFields(data.data[0]);

						//Create a json object of the Profile fields.
						this.Profile.jsonProfile = {
							"_firstName": this.Profile.firstName, 
							"_lastName": this.Profile.lastName, 
							"_company": this.Profile.company,
							"_description": this.Profile.description, 
							"_message": this.Profile.message, 
							"_tagsString": this.Profile.tagsString, 
							"_hasDelivery": this.Profile.hasDelivery,
							"_deliveryRange": this.Profile.deliveryRange, 
							"_country": this.Profile.country, 
							"_displayName": this.Profile.displayName, 
							"_website": this.Profile.website,
							"_userId": this.Profile.userId,
							"_isPublic": this.Profile.isPublic
						};


						//Save the profile as a json object to localStorage
						localStorage.setItem(
							"profile", 
							GlobalService.encode(
								JSON.stringify(this.Profile.jsonProfile)
							)
						);

					} //if(data && data.data && data.data[0]) {

				}) //.subscribe

			} else {
				this.Profile.jsonProfile = JSON.parse(GlobalService.decode(localStorage.getItem('profile')!));
				this.Profile.updateFields(this.Profile.jsonProfile);
			} //If user but no profile.
		}
	}


	//Update the user's profile's isPublic property.
	update() {

		if (
			this.Profile.isPublic === undefined || 
			this.Profile.isPublic === null
		) {
			GlobalService.showToast(
				"Error: No public value found.", 
				"btn-danger", 
				this.toastElement.nativeElement.id
			);
			return;
		}


		//Toggle the isPublic property of the user's profile.
		this.Profile.isPublic = (this.Profile.isPublic == 1) ? 0 : 1;


		//Declare and assign variables.
		let table:string = this.updateTable;
		let columnsArray:any = { 
			"userId": this.user.id, 
			"isPublic": this.Profile.isPublic };
		let where:any = { "userId" : this.user.id};
		let requiredColumnsArray:any = Object.keys(columnsArray);


		//Update the profile in the database.
		this.database.updateData(table,columnsArray,where,requiredColumnsArray)
			.subscribe((response)=>{
				let message = (this.Profile.isPublic == 1) ? 
					"Public." : 
					"Private.";


				this.privacyMessage.nativeElement.innerText = 
					"Your kitchen is " + message;


				localStorage['profile'] = GlobalService.encode(String(JSON.stringify(this.Profile.jsonProfile)));

				
				GlobalService.showToast(
					"Status: " + response.status, 
					"btn-success", 
					this.toastElement.nativeElement.id
				);
			});

	} //update()

}