import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileComponent } from 'src/app/features/profile-pages/profile/profile.component';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';


@Component({
	selector: 'app-profile-edit',
	templateUrl: './profile-edit.component.html',
	styleUrls: ['./profile-edit.component.css']
})


export class ProfileEditComponent implements OnInit {

	@ViewChild('toastElement') toastElement!: ElementRef;

	user: any;
	Profile!: ProfileComponent;
	editForm!: FormGroup;
	profileService!: ProfileService;

	constructor(
		private database: DatabaseService, 
		private formBuilder: FormBuilder,
		private router: Router) {

		this.editForm = this.formBuilder.group({
			firstName: 	['', [ Validators.required ]],
			lastName: 	['', [ Validators.required ]],
			company: 		['', [ Validators.required ]],
			displayName: 	['', [ Validators.required ]],
			website: 		['', [ Validators.required ]],
			description: 	['', [ Validators.maxLength(4096) ]],
			message: 		['', [ Validators.required ]],
			tagsString: 	['', [ Validators.required ]],
			hasDelivery: 	['', [ Validators.required ]],
			deliveryRange: ['', [ Validators.required ]],
			country: 		['', [ Validators.required ]]
		})
	}


	// Object.keys(this.Profile).forEach((key)=>{
	// 	console.log("key: " + key);
	// });


	ngOnInit(): any {

		if (GlobalService && GlobalService.User) {
			this.user = GlobalService.User;
		} else {
			return new Error("Cannot find user in local storage.");
		}

		if (this.Profile === undefined) {
			this.Profile = new ProfileComponent(this.database, this.router);
		}
		this.profileService = new ProfileService(this.database);
		this._getProfile();
		this.fillForm();
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
						this.saveToLocalStorage(r);}});
		} else {
			this.updateFields(_profile);
			this.saveToLocalStorage(_profile);}
	}


	fillForm() {
		/* Update form input values.
			Note: this.getField(key) strips underscore ("_")
			Ex: _firstName beomes firstname */
		if (this.Profile !== undefined) {
			Object.keys(this.Profile).forEach((key) => {
				let _value = this.Profile[key as keyof ProfileComponent];
				let _fieldName = this.getField(key);
				if (
					this.editForm.get( _fieldName ) && 
					_fieldName in this.Profile
				) {
					this.editForm.get( _fieldName )!.setValue(_value);
				}
			});
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


	checkHasDelivery(): any {}


	edit(): any {
		Object.keys(this.Profile).forEach((key) => {
			let _fieldName = this.getField(key);
			if (
				this.editForm.get( _fieldName ) && 
				_fieldName in this.Profile
			) {
				let _value = this.editForm.get( _fieldName )!.value;
				this.Profile[key as keyof ProfileComponent] = _value;
			}
		});

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
			"userId": this.user.id
		};


		//Declare and assign variables.
		let table:string = "profiledata";
		let columnsArray:any = this.Profile.jsonProfile;
		let where:any = { "userId" : this.user.id};
		let requiredColumnsArray:any = Object.keys(columnsArray);

		//Update the profile in the database.
		this.database.updateData(table,columnsArray,where,requiredColumnsArray)
			.subscribe((res)=>{
				GlobalService.showToast(
					res.message, 
					"btn-success",
					this.toastElement.nativeElement.id
				);

				//UPDATE LOCALSTORAGE
				this.saveToLocalStorage(this.Profile.jsonProfile);

				this.router.navigate(['/', 'profile']);
			});

	} //edit()
}