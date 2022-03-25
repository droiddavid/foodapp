import { DatabaseService } from 'src/app/services/database/database.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { User } from 'src/app/shared/user';
import { Delivery } from './delivery';
import { Address } from '../profile-addresses/address';
import { Router } from '@angular/router';


@Component({
	selector: 'app-profile-delivery',
	templateUrl: './profile-delivery.component.html',
	styleUrls: ['./profile-delivery.component.css']
})


export class ProfileDeliveryComponent implements OnInit {


	user!: User;
	Addresses!: Address[];
	oDelivery!: Delivery;


	constructor(private database: DatabaseService, private router: Router) { }


	ngOnInit(): any {
		if(this.oDelivery === undefined) {


			/** Declare local variables  */
			let _localStorageUser: string | null;
			let _localStorageDelivery: string | null;


			/* If there is no user, then return new Error */
			if (!localStorage.getItem('user')) {
				return new Error("Cannot find user in local storage.");
			}


			/* Get the user object from localStorage */
			_localStorageUser = localStorage.getItem('user');
			if (!this.user && _localStorageUser) {
				this.user = JSON.parse(GlobalService.decode(localStorage.getItem('user')!));
			}


			/* Get the user's delivery address from localStorage */
			_localStorageDelivery = localStorage.getItem('delivery');
			if (this.user && _localStorageUser && (_localStorageDelivery === undefined || _localStorageDelivery === null)) {
				this.database.getData("addresses", "userId", this.user.id).subscribe(data => {
					if(data && data.data) {

						this.Addresses = data.data;

						let delivery = this.getDeliveryPickUpAddress();

						if (delivery !== undefined) {
							this.oDelivery = {
								id: delivery.id,
								userId: delivery.userId,
								streetNumber: delivery.addressLine1,
								streetName: delivery.addressLine2,
								city: delivery.city,
								state: delivery.state,
								zip: delivery.zip
							};


							//Save the delivery as a json object to localStorage
							localStorage.setItem(
								"delivery", 
								GlobalService.encode(
									JSON.stringify(this.oDelivery)
								)
							);
						}

					} //if(data && data.data && data.data[0]) {

				}) //.subscribe

			} else {
				this.oDelivery = JSON.parse(GlobalService.decode(localStorage.getItem('delivery')!));
			} //If user but no delivery.
		}
	}


	edit() {
		this.router.navigate(['/', 'profile', 'addDelivery']);
	}


	getDeliveryPickUpAddress (): any {
		let aIndex = this.Addresses.findIndex(function (address) {
			return address.addressType === "Delivery";
		});
		let addressResponse = undefined;
		if (aIndex > -1) {
			addressResponse = this.Addresses[aIndex];
		} else {
			addressResponse = undefined;
		}
		return addressResponse;
	};
}