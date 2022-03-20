import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Email } from 'src/app/features/profile-pages/profile/profile-email-addresses/email';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-email-addresses',
  templateUrl: './profile-email-addresses.component.html',
  styleUrls: ['./profile-email-addresses.component.css']
})


export class ProfileEmailAddressesComponent implements OnInit, AfterViewInit {


	user: any;
	Emails?: Email[];


	constructor(private database: DatabaseService, private router: Router) { }


	ngOnInit(): any {

		/** Declare local variables  */
		let _localStorageUser: string | null;
		let _localStorageEmails: string | null;


		/* If there is no user, then return new Error */
		if (!localStorage.getItem('user')) {
			return new Error("Cannot find user in local storage.");
		}


		/* Get the user object from localStorage */
		_localStorageUser = localStorage.getItem('user');
		if (!this.user && _localStorageUser) {
			this.user = JSON.parse(GlobalService.decode(localStorage.getItem('user')!));
		}


		_localStorageEmails = localStorage.getItem('emails');
		if (this.user && (_localStorageEmails === undefined || _localStorageEmails === null)) {
			this.retrieveEmails();
		} else {
			this.Emails = JSON.parse(GlobalService.decode(localStorage.getItem('emails')!));
		}

	}


	ngAfterViewInit() {
		let _localStorageEmails = localStorage.getItem('emails');

		if (_localStorageEmails == null) {
			return;
		}

		if (_localStorageEmails != null && _localStorageEmails != undefined) {
			this.Emails = JSON.parse(
				GlobalService.decode(
					localStorage.getItem('emails')!
				)
			);
		}
	}


	retrieveEmails() {
		this.database.getData(
			"emails", 
			"userId", 
			this.user.id)
			.subscribe( data => {
				this.Emails = data.data;

				//Save the emails as a json object to localStorage
				localStorage.setItem(
					"emails", 
					GlobalService.encode(
						JSON.stringify(this.Emails)
					)
				);
			});
	}


	addEmail() {
		this.router.navigate(['/', 'profile', 'profileEmailAddresses', 'profileEmailAddressesAdd']);
	}


	xremoveEmail(index:number) {
		console.log("index" + index);
	}


	removeEmail() {
		console.log("index");
	}

}
