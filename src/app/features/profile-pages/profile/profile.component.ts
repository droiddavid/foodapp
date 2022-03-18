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

	
	private _firstName!: string;
	private _lastName!: string; 
	private _company!: string;
	private _description!: string;
	private _message!: string;
	private _tagsString!: string;
	private _hasDelivery!: boolean;
	private _deliveryRange!: number;
	private _country!: string;
	private _displayName!: string;
	private _website!: string;
	private _userId!: any;
	private _jsonProfile: any = {}
	private _isPublic: any;


	public user: any;


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

		if (this.user && _localStorageUser && !_localStorageProfile) {
			this.database.getData("profiledata", "userId", this.user.id)
				.subscribe(data => {

					if (data && data.data && data.data.length > 0) {

						this.updateFields(data.data[0]);						

						localStorage.setItem(
							"profile", 
							GlobalService.encode(
								JSON.stringify({ 
									"firstName": this._firstName, 
									"lastName": this._lastName, 
									"company": this._company, 
									"description": this._description, 
									"message": this._message, 
									"tagsString": this._tagsString, 
									"hasDelivery": this._hasDelivery, 
									"deliveryRange": this._deliveryRange, 
									"country": this._country, 
									"userId": this._userId,
									"isPublic": this._isPublic 
								})
							)
						);
					} else {
						this.router.navigate(['/', 'profile', 'profileAdd']);
					}
				})
		} else {
			//The localStorage profile exists
			let profile = localStorage.getItem('profile')!;

			if (profile) {
				//Decode the profile into JSON.
				let decodedProfile = GlobalService.decode(profile);
				if (decodedProfile) {
					//Assign the JSON object to a local profile object.
					let _profile = JSON.parse(decodedProfile);
					this.updateFields(_profile);
				}
			}
		}
	} //ngOnInit


	ngDoCheck(): any {}


	//Allows objects to update private fields.
	public updateFields(p: any) {
		this._firstName = p.firstName;
		this._lastName = p.lastName;
		this._company = p.company;
		this._description = p.description;
		this._message = p.message;
		this._tagsString = p.tagsString;
		this._hasDelivery = p.hasDelivery;
		this._deliveryRange = p.deliveryRange;
		this._country = p.country;
		this._userId = p.userId;
		this._isPublic = p.isPublic;
	}


	goToEdit() {
		this.router.navigate(['/', 'profile', 'profileEdit']);
	}


	public get firstName() { return this._firstName; }
	public set firstName(value: any) {
		this._firstName = value; 
	}

	public get lastName() { return this._lastName; }
	public set lastName(value: any) {
		this._lastName = value;
	}

	public get company() { return this._company; }
	public set company(value: any) {
		this._company = value;
	}

	public get description() { return this._description; }
	public set description(value: any) {
		this._description = value;
	}

	public get message() { return this._message; }
	public set message(value: any) {
		this._message = value;
	}


	public get tagsString() { return this._tagsString; }
	public set tagsString(value: any) {
		this._tagsString = value;
	}


	public get hasDelivery() { return this._hasDelivery; }
	public set hasDelivery(value: any) {
		this._hasDelivery = value;
	}


	public get deliveryRange() { return this._deliveryRange; }
	public set deliveryRange(value: any) {
		this._deliveryRange = value;
	}


	public get country() { return this._country; }
	public set country(value: any) {
		this._country = value;
	}


	public get displayName() { return this._displayName; }
	public set displayName(value: any) {
		this._displayName = value;
	}


	public get website() { return this._website; }
	public set website(value: any) {
		this._website = value;
	}


	public get userId() { return this._userId; }
	public set userId(value: any) {
		this._userId = value;
	}


	public get jsonProfile() { return this._jsonProfile; }
	public set jsonProfile(value: any) {
		this._jsonProfile = value; 
	}


	public get isPublic() { return this._isPublic; }
	public set isPublic(value: any) {
		this._isPublic = value;
	}

}