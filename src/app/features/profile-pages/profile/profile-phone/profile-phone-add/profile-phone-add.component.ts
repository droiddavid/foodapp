import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Router } from '@angular/router';
import { PhoneNumberService } from './../phoneNumbers.service';
import { PhoneNumber } from './../phoneNumber';


@Component({
	selector: 'app-profile-phone-add',
	templateUrl: './profile-phone-add.component.html',
	styleUrls: ['./profile-phone-add.component.css']
})
export class ProfilePhoneAddComponent implements OnInit {

	@ViewChild('toastElement') toastElement!:ElementRef
	@ViewChild('phoneNumber') phoneNumber!:ElementRef
	@ViewChild('phoneNumberType') phoneNumberType!:ElementRef


	PhoneNumber!: PhoneNumber;
	PhoneNumbers!: any;
	phoneNumberService: PhoneNumberService = new PhoneNumberService(this.database);

	constructor(private database: DatabaseService, private router: Router) { }

	ngOnInit(): any {

		if (!GlobalService.User) {
			GlobalService.showToast("User account not found.", "btn-danger", this.toastElement.nativeElement)
			return;
		}
		if (this.PhoneNumber === undefined) {
			this.PhoneNumber = new PhoneNumber(this.phoneNumberService);
		}

		this._getPhoneNumbers();
	}


	_getPhoneNumbers() {
		this.PhoneNumbers = null;
		this.PhoneNumbers = this.PhoneNumber.getPhoneNumbersFromLocalStorage();

		if (this.PhoneNumbers === null) {

			this.PhoneNumber.getPhoneNumbersFromDatabase()
				.subscribe((data:any) => {
					if ((
						data.message !== "warning" && 
						data.message !== "No data found."
					) && (
						data.data.length > 0
					)) {
						this.PhoneNumbers = data.data;
					} else {
						this.router.navigate(['/', 'profile', 'profilePhoneNumbers']);
					}
				});
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


	onSubmit() {

		let phoneNumber = this.phoneNumber.nativeElement.value;
		let phoneNumberType = this.phoneNumberType.nativeElement.value;

		//insert into DB	
		if (this.PhoneNumber == null) {
			this.PhoneNumber = new PhoneNumber(this.phoneNumberService);
		}

		this.PhoneNumber.insert({
			"userId": GlobalService.User.id,
			"phoneNumber": phoneNumber,
			"phoneNumberType": phoneNumberType,
			"table": 'phoneNumbers'
		})
			.subscribe((response: { status: string; }) => {

				GlobalService.showToast(
					"Add phoneNumber: " + response.status,
					"btn-success", 
					this.toastElement.nativeElement.id
				);
				
				if (response.status === "success") {
					let newPhoneNumber = {
						userId: GlobalService.User.id, 
						phoneNumber: phoneNumber, 
						phoneNumberType: phoneNumberType, 
						displayToPublic: '0'
					}
					this.PhoneNumbers.push(newPhoneNumber);
				}

				//Save the phoneNumbers as a json object to localStorage
				localStorage.setItem(
					"phoneNumbers", 
					GlobalService.encode(
						JSON.stringify(this.PhoneNumbers)
					)
				);

				this.router.navigate(['/', 'profile', 'profilePhoneNumbers']);
			}
		); //end .subscribe
	}


	cancel() {
		this.router.navigate(['profile/profilePhoneNumbers']);
	}
}