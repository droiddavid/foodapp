import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Router } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-add-email-address',
  templateUrl: './add-email-address.component.html',
  styleUrls: ['./add-email-address.component.css']
})
export class AddEmailAddressComponent implements OnInit, AfterViewInit {

	@ViewChild('toastElement') toastElement!:ElementRef
	@ViewChild('email') email!:ElementRef
	@ViewChild('emailType') emailType!:ElementRef


	user!: any;
	Emails!: Email[];


	constructor(private database: DatabaseService, private router: Router) { }


	ngOnInit(): any {

		/** Declare local variables  */
		let _localStorageUser: string | null;


		/* If there is no user, then return new Error */
		if (!localStorage.getItem('user')) {
			return new Error("Cannot find user in local storage.");
		}


		/* Get the user object from localStorage */
		_localStorageUser = localStorage.getItem('user');
		if (!this.user && _localStorageUser) {
			this.user = JSON.parse(GlobalService.decode(localStorage.getItem('user')!));
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


	save() {
		let email = this.email.nativeElement.value;
		let emailType = this.emailType.nativeElement.value;
		//insert into DB

		this.database.insert({
			"userId": this.user.id,
			"email": email,
			"emailType": emailType,
			"table": 'emails'
		})
			.subscribe((response) => {
				GlobalService.showToast(
					"Add email: " + response.status,
					"btn-success", 
					this.toastElement.nativeElement.id
				);
				

				if (response.status === "success") {
					this.Emails.push({
						email: email,
						emailType: emailType
					});
				}

				//Save the emails as a json object to localStorage
				localStorage.setItem(
					"emails", 
					GlobalService.encode(
						JSON.stringify(this.Emails)
					)
				);

			}
		); //end .subscribe
	}


	cancel() {
		this.router.navigate(['profile/profileEmailAddresses']);
	}

}