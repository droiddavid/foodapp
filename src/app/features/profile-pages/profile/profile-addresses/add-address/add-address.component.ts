import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { User } from 'src/app/types/user';
import { Address } from '../address';

@Component({
	selector: 'app-add-address',
	templateUrl: './add-address.component.html',
	styleUrls: ['./add-address.component.css']
})


export class AddAddressComponent implements OnInit {
	@ViewChild('toastElement') toastElement!:ElementRef;

	//HTML Form
	form: FormGroup;
	Addresses!: Address[];
	user!: User;

	address: any;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private database: DatabaseService) {
		this.form = this.formBuilder.group({
			addressLine1: 		['', [ Validators.required ]],
			addressLine2: 		['', []],
			city: 			['', []],
			state: 			['', []],
			zip: 			['', []],
			addressType: 		['', []]
		});
	}

	ngOnInit(): any {
		this.getUser();
	}


	getUser(): any {
		/** Declare local variables  */
		let _localStorageUser: string | null;
		let _localStorageAddress: string | null;


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
		_localStorageAddress = localStorage.getItem('addresses');
		if (this.user && _localStorageUser && (_localStorageAddress === undefined || _localStorageAddress === null)) {
			this.database.getData("addresses", "userId", this.user.id).subscribe(data => {
				if(data && data.data && data.data[0]) {

					this.Addresses = data.data;

					debugger;
					//for each address, if value =  'NULL' replace it with ''	
					Object.keys(this.Addresses).forEach(key => {
						if (this.address[key] === "NULL") {
							this.address[key] = '';
						}
					});


					//Save the profile as a json object to localStorage
					localStorage.setItem(
						"addresses", 
						GlobalService.encode(
							JSON.stringify(this.Addresses)
						)
					);

				} //if(data && data.data && data.data[0]) {

			}) //.subscribe

		} else {
			this.Addresses = JSON.parse(GlobalService.decode(localStorage.getItem('addresses')!));
					//for each address, if value == 'NULL' replace it with ''
					this.Addresses.forEach((a:any) => {
						for(let key in a) {
							if (a[key] === "NULL") {
								a[key] = '';
							}
						}
					});

		}
	}

	onSubmit() {
		let o = "{";
		Object.keys(this.form.controls).forEach(key => {
			o = o + "\"" + key + "\":\"" + this.form.get(key)!.value + "\",";
		});
		o = JSON.parse(
			o.substring(0, o.length - 1) + 
			", \"table\":\"addresses\"" +
			", \"userId\":" + this.user.id + "}"
		);

		this.address = JSON.parse(JSON.stringify(o));

		//Add a space to any empty fields
		Object.keys(this.address).forEach(key => {
			if (this.address[key] === "") {
				this.address[key] = 'NULL';
			}
		});

		//insert into DB
		this.database.insert(this.address)
			.subscribe((response) => {

				GlobalService.showToast(
					"Add address: " + response.status,
					"btn-success", 
					this.toastElement.nativeElement.id
				);
				
				delete this.address.table;

				if (response.status === "success") {
					this.Addresses.push(this.address);
				}

				//Save the emails as a json object to localStorage
				localStorage.setItem(
					"addresses", 
					GlobalService.encode(
						JSON.stringify(this.Addresses)
					)
				);
			}
		); //end .subscribe
	}

}