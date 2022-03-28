import { DatabaseService } from './../../services/database/database.service';
import { DoCheck, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';
import { ProfileComponent } from 'src/app/features/profile-pages/profile/profile.component';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/features/profile-pages/profile/profile.service';



@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit, DoCheck {

	@ViewChild('body') body!: ElementRef;
	@ViewChild('navbar') navbar!: ElementRef;
	@ViewChild('mpkFooter') mpkFooter!: ElementRef;

	user: any;
	Profile!: ProfileComponent;
	faChevronLeft = faChevronLeft;
	profileService!: ProfileService;


	constructor(private database: DatabaseService, private router: Router) { }


	ngOnInit(): any {
		this.Profile = new ProfileComponent(this.database, this.router);
		this.profileService = new ProfileService(this.database);
		this._getProfile();		
	} //ngOnInit


	ngDoCheck() {
		//Set Profile company name because this.Profile data
		//may not be available yet.
		if(this.Profile === undefined) {
			//Initialize the Profile object.
			if (this.Profile === undefined) {
				this.Profile = new ProfileComponent(this.database, this.router);
				this.Profile.company = "";
			}
		}
	}

	//Get the user's profile from LocalStorage or the DB.
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

		let p:any = (profile.data && profile.data.length > 0) ? 
			profile.data[0] : 
			profile;

		this.Profile.firstName = p.firstName;
		this.Profile.lastName = p.lastName;
		this.Profile.company = p.company;
		this.Profile.description = p.description;
		this.Profile.message = p.message;
		this.Profile.tagsString = p.tagsString;
		this.Profile.hasDelivery = p.hasDelivery;
		this.Profile.deliveryRange = p.deliveryRange;
		this.Profile.country = p.country;
		this.Profile.userId = p.userId;
		this.Profile.isPublic = p.isPublic;
	}
}