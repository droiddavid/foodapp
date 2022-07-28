import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { Email } from 'src/app/features/profile-pages/profile/profile-email-addresses/email';
import { EmailService } from './email.service';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
	selector: 'app-profile-email-addresses',
	templateUrl: './profile-email-addresses.component.html',
	styleUrls: ['./profile-email-addresses.component.css']
})
export class ProfileEmailAddressesComponent implements OnInit {

	@ViewChild('toastElement') toastElement!:ElementRef;

	faPlus = faPlus;
	faTimes = faTimes;

	Email!: Email;
	Emails: any;


	constructor(
		private router: Router,
		private emailService: EmailService
	) {}


	ngOnInit(): any {
		if (!GlobalService.User.id) {
			this.router.navigate(['/', 'login']);
		}
		if (this.Email === undefined) {
			this.Email = new Email(this.emailService);
		}
		this._getEmails();
	}


	_getEmails() {
		this.Emails = null;
		this.Emails = this.Email.getEmailsFromLocalStorage();

		if (this.Emails === null) {

			this.Email.getEmailsFromDatabase()
				.subscribe((data:any) => {

					if (
						(data.message !== "warning" && data.message !== "No data found.") &&
						(data.data.length > 0)
					) {
						this.Emails = data.data; 
						this.updateFields(this.Emails);
						this.saveToLocalStorage(this.Emails);
					}
				});

		} else {
			this.updateFields(this.Emails);
			this.saveToLocalStorage(this.Emails);
		}
	}


	//Save the email as a json object to localStorage
	saveToLocalStorage(email:any): void {
	
		let e:any;
		if (email.data && email.data.length > 0) {
			e = email.data[0];
		}


		//Case 1: e = e.email.data[0]
		if (e !== undefined && typeof e === "object") {
			localStorage.setItem(
				"emails", 
				GlobalService.encode(JSON.stringify(e))
			);
			return;
		}


		//Case 2: e = "string value"
		if (e !== undefined && typeof e === "string") {
			localStorage.setItem(
				"emails", 
				GlobalService.encode(e)
			);
			return;
		}


		//Case 3: e = {}
		localStorage.setItem(
			"emails", 
			GlobalService.encode(JSON.stringify(email))
		);
	}


	//Allows objects to update private fields.
	public updateFields(email: any) {
		let e:any = (email.data && email.data.length > 0) ? 
			email.data[0] : 
			email;

		this.Email.userId = e.userId;
		this.Email.email = e.email;
		this.Email.emailType = e.emailType;

	}


	xngAfterViewInit() {
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


	addEmail() {
		//this.router.navigate(['/', 'profile', 'profileEmailAddresses', 'profileEmailAddressesAdd']);
		this.router.navigate(['/', 'profileEmailAddressesAdd']);
	}


	removeEmail(e: Email) {

		let emailToDelete = {
			"table" : "emails",
			"firstFieldName" : "userId",
			"firstFieldValue" : GlobalService.User.id,
			"secondFieldName" : "email",
			"secondFieldValue" : e
		}

		this.emailService.delete( emailToDelete )
			.subscribe((response) => {

				GlobalService.showToast(
					e + ' was deleted. [STATUS: ' + response.status + "]", 
					"btn-success",
					this.toastElement.nativeElement.id
				);

				//Remove phone number from the User's phone number array.
				let eIndex = this.Emails.findIndex((_e:any) => {
					return _e.email === e;
				});

				if (eIndex > -1) {
					this.Emails.splice(eIndex, 1);
				}

				//UPDATE LOCALSTORAGE
				this.saveToLocalStorage(this.Emails);
			});
	}
}