import { DatabaseService } from './../../services/database/database.service';
import { AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';


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
	Profile: any;

	faChevronLeft = faChevronLeft;

	constructor(private database: DatabaseService) { }

	ngOnInit(): any {

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
					this.Profile = data.data[0];
					
					localStorage.setItem("profile", GlobalService.encode(JSON.stringify(this.Profile)));
				})
		}
	}

	
	ngDoCheck(): any {

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
					this.Profile = data.data[0];
					
					localStorage.setItem("profile", GlobalService.encode(JSON.stringify(this.Profile)));
				})
		} else {
			//The localStorage profile exists
			let profile = localStorage.getItem('profile')!;

			if (profile) {
				debugger;
				//Decode the profile into JSON.
				let decodedProfile = GlobalService.decode(profile);
				if (decodedProfile) {
					//Assign the JSON object to the Profile object.
					this.Profile = JSON.parse(decodedProfile);

					//Deconstruct for the company name only.
					let { company } = this.Profile;

					//Reassign the Profile object with the deconstructed object.
					this.Profile = { company };
				}
			}
		}
	}
}