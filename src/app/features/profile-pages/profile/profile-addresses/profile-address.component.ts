import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Address } from './address';
import { AddressService } from './address.service';


@Component({
	selector: 'app-profile-address',
	templateUrl: './profile-address.component.html',
	styleUrls: ['./profile-address.component.css']
})
export class ProfileAddressComponent implements OnInit {

	@ViewChild('toastElement')
	toastElement!: ElementRef;

	Address!: Address;
	Addresses: Array<Address> = new Array();


	constructor(
		private router: Router,
		private addressService: AddressService
	) {}


	ngOnInit(): any {
		if (this.Address === undefined) {
			this.Address = new Address(this.addressService);
		}
		this._getAddresses();
	} //ngOnInit


	_getAddresses() {
		this.Addresses = [];
		//this.Addresses = this.Address.getAddressesFromLocalStorage();
		//let ary_addresses = this.Address.getAddressesFromLocalStorage();

		if (this.Address.getAddressesFromLocalStorage() === null) {

			this.Address.getAddressesFromDatabase()
				.subscribe((data:any) => {

					if (
						(data.message !== "warning" && data.message !== "No data found.") &&
						(data.data.length > 0)
					) {
						this.Addresses = data.data; 

						//for each address, if value == 'NULL' replace it with ''
						this.Addresses.forEach((a:any) => {
							for (let key in a) {
								if (a[key] === 'NULL') {
									a[key] = '';
								}
							}
						});


						this.updateFields(this.Addresses);
						this.saveToLocalStorage(this.Addresses);
					} else {
						this.router.navigate(['/', 'profileAddresses']);
					}

				});

		} else {
			this.updateFields(this.Addresses);
			this.saveToLocalStorage(this.Addresses);
		}
	}


	//Save the address as a json object to localStorage
	saveToLocalStorage(address:any): void {

		let a:any;
		if (address.data && address.data.length > 0) {
			a = address.data[0];
		}


		//Case 1: a = a.address.data[0]
		if (a !== undefined && typeof a === "object") {
			localStorage.setItem(
				"addresses", 
				GlobalService.encode(JSON.stringify(a))
			);
			return;
		}


		//Case 2: a = "string value"
		if (a !== undefined && typeof a === "string") {
			localStorage.setItem(
				"addresses", 
				GlobalService.encode(a)
			);
			return;
		}


		//Case 3: a = {}
		localStorage.setItem(
			"addresses", 
			GlobalService.encode(JSON.stringify(address))
		);
	}


	//Allows objects to update private fields.
	public updateFields(address: any) {
		let a:any = (address.data && address.data.length > 0) ? 
			address.data[0] : 
			address;

		this.Address.id = a.id;
		this.Address.userId = a.userId;
		this.Address.addressLine1 = a.addressLine1;
		this.Address.addressLine2 = a.addressLine2;
		this.Address.city = a.city;
		this.Address.state = a.state;
		this.Address.zip = a.zip;
		this.Address.addressType = a.addressType;

	}


	removeAddress(a: any) {
		let addressToDelete = {
			"table" : "addresses",
			"firstFieldName" : "userId",
			"firstFieldValue" : GlobalService.User.id,
			"secondFieldName" : "id",
			"secondFieldValue" : a.id
		}

		this.addressService.delete(addressToDelete)
			.subscribe((response:any) => {

				GlobalService.showToast(
					a + ' was deleted. [STATUS: ' + response.status + "]",
					"btn-success",
					this.toastElement.nativeElement.id
				)
				
				//Remove address from the User's Address array.
				let aIndex = this.Addresses.findIndex((_a:any) => {
					return _a.id === a.id;
				});

				if (aIndex > -1) {
					this.Addresses.splice(aIndex, 1);
				}

				//UPDATE LOCALSTORAGE
				this.saveToLocalStorage(this.Addresses);
			}
		);
	}
}