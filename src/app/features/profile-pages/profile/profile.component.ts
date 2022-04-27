import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ProfileService } from 'src/app/features/profile-pages/profile/profile.service';
import { Profile } from './profile';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	@ViewChild('body') body!: ElementRef;

	
	private _firstName!: string;
	private _lastName!: string; 
	private _company!: string;
	private _description!: string;
	private _image!: string;
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


	oProfile!: Profile;
	profileService!: ProfileService;


	constructor(private database: DatabaseService, private router: Router) { }


	ngOnInit(): any {
		this.profileService = new ProfileService(this.database);
		this._getProfile();		
	} //ngOnInit


	_getProfile() {
		let _profile = null;
		_profile = this.profileService.getProfileFromLocalStorage();

		if (_profile === null) {
			this.profileService.getProfileFromDatabase()
				.subscribe((r) => {
					if (r.message === "No data found.") {
						this.router.navigate(['/', 'profile', 'profileAdd']);
					} else {
						this.updateFields(r);
						this.saveToLocalStorage(r);}});
		} else {
			this.updateFields(_profile);
			this.saveToLocalStorage(_profile);}
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

		let p:any = (profile.data && profile.data.length > 0) ? 
			profile.data[0] : 
			profile;

		this._firstName = p.firstName;
		this._lastName = p.lastName;
		this._company = p.company;
		this._description = p.description;
		this._image = p.image;
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

	public get image() { return this._image; }
	public set image(value: any) {
		this._image = value;
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