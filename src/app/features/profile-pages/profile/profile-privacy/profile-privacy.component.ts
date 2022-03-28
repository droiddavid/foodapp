import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { ProfileComponent } from 'src/app/features/profile-pages/profile/profile.component';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';


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
	profileService!: ProfileService;


	constructor(private database: DatabaseService, private router: Router) {} //constructor


	ngOnInit(): any {

		/* If there is no user, then return new Error */
		if (!GlobalService.User) {
			return new Error("Cannot find user in local storage.");
		} else {
			this.user = GlobalService.User;
		}

		if (this.Profile === undefined) {
			this.Profile = new ProfileComponent(this.database, this.router);
		}
		this.profileService = new ProfileService(this.database);
		this._getProfile();
	}


	_getProfile() {
		let _profile = null;
		_profile = this.profileService.getProfileFromLocalStorage();

		if (_profile === null) {
			this.profileService.getProfileFromDatabase()
				.subscribe((r) => {
					if (r.message === "No data found.") {
						this.router.navigate(['/', 'profile', 'profileAdd']);
					} else {
						this.updateFields(r); //this.Profile = ...
						this.saveToLocalStorage(r);
					}
				});
		} else {
			this.updateFields(_profile);
			this.saveToLocalStorage(_profile);
		}
	}


	//Save the profile as a json object to localStorage
	saveToLocalStorage(profile:any) {
		let p:any;
		if (profile.data && profile.data.length > 0) {
			p = profile.data[0];
		}


		//Case 1: p = p.profile.data[0]
		if (p !== undefined && typeof p === "object") {
			localStorage.setItem(
				"profile", 
				GlobalService.encode(JSON.stringify(p))
			);
			return;
		}


		//Case 2: p = "string value"
		if (p !== undefined && typeof p === "string") {
			localStorage.setItem(
				"profile", 
				GlobalService.encode(p)
			);
			return;
		}


		//Case 3: p = {}
		localStorage.setItem(
			"profile", 
			GlobalService.encode(JSON.stringify(profile))
		);
	}


	//Allows objects to update private fields.
	public updateFields(profile: any) {
		let p:any = (profile.data && profile.data.length > 0) ? profile.data[0] : profile;
		Object.keys(p).forEach((key) => {
			let _value = p[key as keyof ProfileComponent];
			if (key !== "database" && key !== "_jsonProfile" && key !== "router" && key !== "_userId" && key !== "_isPublic") {
				this.Profile[key as keyof ProfileComponent] = _value;
			}
		});
	}


	getField(key: any): string {
		let _fieldname!:string;
		if (key.indexOf("_") > -1) {
			_fieldname = key.split("_")[1]
		}
		return _fieldname;
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