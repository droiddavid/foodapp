import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { PhoneNumber } from './phoneNumber';
import { PhoneNumberService } from './phoneNumbers.service';
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
	selector: 'app-profile-phoneNumbers',
	templateUrl: './profile-phoneNumbers.component.html',
	styleUrls: ['./profile-phoneNumbers.component.css']
})
export class ProfilePhoneComponent implements OnInit {

	@ViewChild('toastElement') toastElement!: ElementRef;

	faInfoCircle = faInfoCircle;
	faTimes = faTimes;

	PhoneNumber!: PhoneNumber;
	PhoneNumbers: any;


	constructor(
		private router: Router,
		private phoneNumberService: PhoneNumberService
	) {}


	ngOnInit(): any {
		if (this.PhoneNumber === undefined) {
			this.PhoneNumber = new PhoneNumber(this.phoneNumberService);
		}
		this._getPhoneNumbers();
	} //ngOnInit


	_getPhoneNumbers() {
		this.PhoneNumbers = null;
		this.PhoneNumbers = this.PhoneNumber.getPhoneNumbersFromLocalStorage();

		if (this.PhoneNumbers === null) {

			this.PhoneNumber.getPhoneNumbersFromDatabase()
				.subscribe((data:any) => {

					if (
						(data.message !== "warning" && data.message !== "No data found.") &&
						(data.data.length > 0)
					) {
						this.PhoneNumbers = data.data; 
						this.updateFields(this.PhoneNumbers);
						this.saveToLocalStorage(this.PhoneNumbers);
					} else {
						//this.router.navigate(['/', 'profile', 'addPhoneNumber']);
					}

				});

		} else {
			this.updateFields(this.PhoneNumbers);
			this.saveToLocalStorage(this.PhoneNumbers);
		}
	}


	//Save the phone number as a json object to localStorage
	saveToLocalStorage(phoneNumber:any): void {
	
		let p:any;
		if (phoneNumber.data && phoneNumber.data.length > 0) {
			p = phoneNumber.data[0];
		}


		//Case 1: p = p.phoneNumber.data[0]
		if (p !== undefined && typeof p === "object") {
			localStorage.setItem(
				"addresses", 
				GlobalService.encode(JSON.stringify(p))
			);
			return;
		}


		//Case 2: p = "string value"
		if (p !== undefined && typeof p === "string") {
			localStorage.setItem(
				"addresses", 
				GlobalService.encode(p)
			);
			return;
		}


		//Case 3: p = {}
		localStorage.setItem(
			"addresses", 
			GlobalService.encode(JSON.stringify(phoneNumber))
		);
	}


	//Allows objects to update private fields.
	public updateFields(phoneNumber: any) {

		if (
			typeof phoneNumber === "object" &&
			phoneNumber.hasOwnProperty("length")
		) {
			//This is an array and therefore cannot be
			//assigned to the single object below.
			return;
		}

		let p:any = (phoneNumber.data && phoneNumber.data.length > 0) ? 
			phoneNumber.data[0] : 
			phoneNumber;

		this.PhoneNumber.id = p.id;
		this.PhoneNumber.userId = p.userId;
		this.PhoneNumber.phoneNumber = p.phoneNumber;
		this.PhoneNumber.phoneNumberType = p.phoneNumberType;
		this.PhoneNumber.displayToPublic = p.displayToPublic;
	}


	addPhoneNumber() {
		this.router.navigate(['/', 'profile', 'addPhoneNumber']);
	}


	removePhoneNumber(phone:any) {
		try {
			let PhoneNumberToDelete = {
				"table" : "phoneNumbers",
				"firstFieldName" : "userId",
				"firstFieldValue" : GlobalService.User.id,
				"secondFieldName" : "id",
				"secondFieldValue" : phone.id
			}
			this.phoneNumberService.delete2(PhoneNumberToDelete)
				.subscribe((response) => {

					//Remove phone number from the User's phone number array.
					let pIndex = this.PhoneNumbers.findIndex((p:any) => {
						return p.id === phone.id;
					});
					if (pIndex > -1) {
						this.PhoneNumbers.splice(pIndex, 1);
					}


					GlobalService.showToast(
						phone.phoneNumber + ' was deleted.', 
						"btn-success",
						this.toastElement.nativeElement.id
					);

					//UPDATE LOCALSTORAGE
					this.saveToLocalStorage(this.PhoneNumbers);
				});

		} catch ( error ) {
			GlobalService.showToast(
				"Delete Failed.  An error occurred.", 
				"btn-danger",
				this.toastElement.nativeElement.id
			);
			return error;
		}
	}

	editCheckbox(phone:any) {
		console.log("phone: " + phone);
		console.table([phone]);
	}
}