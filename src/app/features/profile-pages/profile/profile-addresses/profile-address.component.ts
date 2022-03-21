import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { Address } from './address';

@Component({
  selector: 'app-profile-address',
  templateUrl: './profile-address.component.html',
  styleUrls: ['./profile-address.component.css']
})
export class ProfileAddressComponent implements OnInit, AfterViewInit {


	user: any;
	Addresses?: Address[];


	constructor(private database: DatabaseService, private router: Router) { }


	ngOnInit(): any {

		/** Declare local variables  */
		let _localStorageUser: string | null;
		let _localStorageAddresses: string | null;


		/* If there is no user, then return new Error */
		if (!localStorage.getItem('user')) {
			return new Error("Cannot find user in local storage.");
		}


		/* Get the user object from localStorage */
		_localStorageUser = localStorage.getItem('user');
		if (!this.user && _localStorageUser) {
			this.user = JSON.parse(GlobalService.decode(localStorage.getItem('user')!));
		}


		_localStorageAddresses = localStorage.getItem('addresses');
		if (this.user && (_localStorageAddresses === undefined || _localStorageAddresses === null)) {
			this.retrieveAddresses();
		} else {
			this.Addresses = JSON.parse(GlobalService.decode(localStorage.getItem('addresses')!));
		}

	}


	ngAfterViewInit() {
		let _localStorageAddresses = localStorage.getItem('addresses');

		if (_localStorageAddresses == null) {
			return;
		}

		if (_localStorageAddresses != null && _localStorageAddresses != undefined) {
			this.Addresses = JSON.parse(
				GlobalService.decode(
					localStorage.getItem('addresses')!
				)
			);
		}
	}


	retrieveAddresses() {
		this.database.getData(
			"addresses", 
			"userId", 
			this.user.id)
			.subscribe( data => {
				this.Addresses = data.data;

				//Save the emails as a json object to localStorage
				localStorage.setItem(
					"addresses", 
					GlobalService.encode(
						JSON.stringify(this.Addresses)
					)
				);
			});
	}


	// addAddress() {
	// 	this.router.navigate(['/', 'profile', 'profileEmailAddresses', 'profileEmailAddressesAdd']);
	// }

}
