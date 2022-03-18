import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileComponent } from 'src/app/features/profile-pages/profile/profile.component';
import { Router } from '@angular/router';


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


						/* 
							Set each form input to the updated values.
							Note: this.getField(key) strips the underscore ("_")
							Ex: _firstName beomes firstname to match the 
							formGroup's field name.
						*/
						Object.keys(this.Profile).forEach((key) => {

							//Get the value of the current key.
							let _value = this.Profile[key as keyof ProfileComponent];

							//If the key is a form input, then update the form's input value (for view purposes).
							if (key !== "database" && key !== "_jsonProfile" && key !== "router" && key !== "_userId") {
								console.log(key + " = " + _value);
								this.editForm.get( this.getField(key) )!.setValue(_value);
							}
						});

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
							"_userId": this.Profile.userId
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
				
				for (let [ key, value ] of Object.entries(this.Profile.jsonProfile)) {
					//k represents the fields on the form we dont want in the Profile object.
					let k = (key === 'id' || key === 'displayName' || key === 'website' || key === 'image' || key === 'isPublic' || key === 'userId' || key === 'email');
					if (k) continue; else {
						this.editForm.get(key)!.setValue(value);
					}
				}
			} //If user but no profile.
		}
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

		this.Profile.firstName = this.editForm.get('firstName')!.value;
		this.Profile.lastName = this.editForm.get('lastName')!.value;
		this.Profile.company = this.editForm.get('company')!.value;
		this.Profile.description = this.editForm.get('description')!.value;
		this.Profile.message = this.editForm.get('message')!.value;
		this.Profile.tagsString = this.editForm.get('tagsString')!.value;
		this.Profile.hasDelivery = this.editForm.get('hasDelivery')!.value;
		this.Profile.deliveryRange = this.editForm.get('deliveryRange')!.value;
		this.Profile.country = this.editForm.get('country')!.value;


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
		debugger;

		//Update the profile in the database.
		this.database.updateData(table,columnsArray,where,requiredColumnsArray)
			.subscribe((res)=>{
				debugger;
				GlobalService.showToast(
					res.message, 
					"btn-success",
					this.toastElement.nativeElement.id
				);
				this.router.navigate(['/', 'profile']);
			});

	} //edit()
}