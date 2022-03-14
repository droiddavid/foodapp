import { Component, OnInit } from '@angular/core';
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
			tags: 		['', [ Validators.required ]],
			hasDelivery: 	['', [ Validators.required ]],
			deliveryRange: ['', [ Validators.required ]],
			country: 		['', [ Validators.required ]]
		})
	}

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
			if (this.user && _localStorageUser && (_localStorageProfile === undefined)) {
				this.database.getData("profiledata", "userId", this.user.id)
					.subscribe(data => {
						if(data) {
							if (data.data) {
								if(data.data[0]) {
									this.Profile = data.data[0];
									this.editForm.get('firstName')!.setValue(this.Profile.firstName);

									localStorage.setItem("profile", GlobalService.encode(JSON.stringify(this.Profile)));
								}
							}
						}
					})
			} else {
				this.Profile = JSON.parse(GlobalService.decode(localStorage.getItem('profile')!));
				
				for (let [ key, value ] of Object.entries(this.Profile)) {
					let k = (key === 'id' || key === 'displayName' || key === 'website' || key === 'image' || key === 'isPublic' || key === 'userId' || key === 'email');
					if (k) continue; else {
						this.editForm.get(key)!.setValue(value);
					}
				}
			}
		}
	}



	onSubmit(): any {
		debugger;
		let editformvalue = this.editForm;
		console.table([editformvalue]);
		debugger;
	}
	checkHasDelivery(): any {}

	save(): any {
		/* ************************************************/
		//The user does not already exist.
		// if (response.data.length === 0) {
		// 	//insert into DB
		// 	this.database.insert({
		// 		"emailAddress": this._email,
		// 		"lastLogin": new Date(), "lastUpdate": Date.now(),
		// 		"message": 'Tell us something about yourself.',
		// 		"role": 2,
		// 		"status": 1,
		// 		"table": 'users'
		// 	})
		// 		.subscribe(() => {
		// 			GlobalService.showToast(
		// 				"User added successfully.",
		// 				"btn-success", 
		// 				this.toastElement.nativeElement.id
		// 			);
		// 			this.router.navigate(['home/signin']);
		// 		}); //end .subscribe
		// }
		/* ************************************************/
	}
}