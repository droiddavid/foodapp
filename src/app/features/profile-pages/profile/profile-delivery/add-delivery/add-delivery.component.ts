import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { User } from 'src/app/shared/user';
import { Address } from '../../profile-addresses/address';
import { Delivery } from '../delivery';


@Component({
	selector: 'app-add-delivery',
	templateUrl: './add-delivery.component.html',
	styleUrls: ['./add-delivery.component.css']
})


export class AddDeliveryComponent implements OnInit, AfterViewInit {

	@ViewChild('toastElement') toastElement!:ElementRef;

	user!: User;
	Addresses!: Address[];
	oDelivery!: Delivery;
	form!: FormGroup;

	states = [{ "abbr": 'AL', "state_name": 'Alabama' }, { "abbr": 'AK', "state_name": 'Alaska' },{ "abbr": 'AZ', "state_name": 'Arizona' }, { "abbr": 'AR', "state_name": 'Arkansas' },{ "abbr": 'CA', "state_name": 'California' }, { "abbr": 'CO', "state_name": 'Colorado' },{ "abbr": 'CT', "state_name": 'Connecticut' }, { "abbr": 'DE', "state_name": 'Delaware' },{ "abbr": 'DC', "state_name": 'District Of Columbia' }, { "abbr": 'FL', "state_name": 'Florida' },{ "abbr": 'GA', "state_name": 'Georgia' }, { "abbr": 'HI', "state_name": 'Hawaii' },{ "abbr": 'ID', "state_name": 'Idaho' }, { "abbr": 'IL', "state_name": 'Illinois' },{ "abbr": 'IN', "state_name": 'Indiana' }, { "abbr": 'IA', "state_name": 'Iowa' },{ "abbr": 'KS', "state_name": 'Kansas' }, { "abbr": 'KY', "state_name": 'Kentucky' },{ "abbr": 'LA', "state_name": 'Louisiana' }, { "abbr": 'ME', "state_name": 'Maine' },{ "abbr": 'MD', "state_name": 'Maryland' }, { "abbr": 'MA', "state_name": 'Massachusetts' },{ "abbr": 'MI', "state_name": 'Michigan' }, { "abbr": 'MN', "state_name": 'Minnesota' },{ "abbr": 'MS', "state_name": 'Mississippi' }, { "abbr": 'MO', "state_name": 'Missouri' },{ "abbr": 'MT', "state_name": 'Montana' }, { "abbr": 'NE', "state_name": 'Nebraska' },{ "abbr": 'NV', "state_name": 'Nevada' }, { "abbr": 'NH', "state_name": 'New Hampshire' },{ "abbr": 'NJ', "state_name": 'New Jersey' }, { "abbr": 'NM', "state_name": 'New Mexico' },{ "abbr": 'NY', "state_name": 'New York' }, { "abbr": 'NC', "state_name": 'North Carolina' },{ "abbr": 'ND', "state_name": 'North Dakota' }, { "abbr": 'OH', "state_name": 'Ohio' },{ "abbr": 'OK', "state_name": 'Oklahoma' }, { "abbr": 'OR', "state_name": 'Oregon' },{ "abbr": 'PA', "state_name": 'Pennsylvania' }, { "abbr": 'RI', "state_name": 'Rhode Island' },{ "abbr": 'SC', "state_name": 'South Carolina' }, { "abbr": 'SD', "state_name": 'South Dakota' },{ "abbr": 'TN', "state_name": 'Tennessee' }, { "abbr": 'TX', "state_name": 'Texas' },{ "abbr": 'UT', "state_name": 'Utah' }, { "abbr": 'VT', "state_name": 'Vermont' },{ "abbr": 'VA', "state_name": 'Virginia' }, { "abbr": 'WA', "state_name": 'Washington' },{ "abbr": 'WV', "state_name": 'West Virginia' }, { "abbr": 'WI', "state_name": 'Wisconsin' },{ "abbr": 'WY', "state_name": 'Wyoming' }];


	constructor(private database: DatabaseService, 
		private router: Router,
		private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			streetNumber: 	['', [ Validators.required ]],
			streetName: 	['', [ Validators.required ]],
			city: 		['', [ Validators.required ]],
			state: 		['', [ Validators.required ]],
			zip: 		['', [ Validators.required ]]
		})
	}


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
				this.database.getData("addresses", "userId", this.user.id)
				.subscribe(data => {
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



		let _localStorageAddresses: string | null;
		/* Get the user's  addresses from localStorage */
		_localStorageAddresses = localStorage.getItem('addresses');
		if ((_localStorageAddresses === undefined || _localStorageAddresses === null)) {
			this.database.getData("addresses", "userId", this.user.id)
			.subscribe(data => {

				if(data && data.data) {

					this.Addresses = data.data;

					//Save the delivery as a json object to localStorage
					localStorage.setItem(
						"addresses", 
						GlobalService.encode(
							JSON.stringify(this.Addresses)
						)
					);

				} //if(data && data.data && data.data[0]) {

			}) //.subscribe
		}





	}


	ngAfterViewInit() {

		if (this.oDelivery !== null && this.oDelivery !== undefined) {
			this.oDelivery = JSON.parse(GlobalService.decode(localStorage.getItem('delivery')!));

			for (let [ key, value ] of Object.entries(this.oDelivery)) {
				if (key !== "id" && key !== "userId") {
					this.form.get(key)!.setValue(value);
				}
			}
		}
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



	retrieveAddresses(): any {
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

				return data.data;
			});
	}

	async onSubmit() {

		let address: Address = { id: 0, userId: "", addressLine1: "", addressLine2: "", city: "", state: "", zip: "", addressType: "Delivery" };
		address.id = this.oDelivery.id;
		address.userId = this.oDelivery.userId;

		address.addressLine1 = this.form.get("streetNumber")?.value;
		address.addressLine2 = this.form.get("streetName")?.value;

		address.city = this.form.get("city")?.value;
		address.state = this.form.get("state")?.value;
		address.zip = this.form.get("zip")?.value;

		
		//Save the delivery as a json object to localStorage
		localStorage.setItem(
			"delivery", 
			GlobalService.encode(
				JSON.stringify({
					id: this.oDelivery.id,
					userId: this.oDelivery.userId,
					streetNumber: this.form.get("streetNumber")?.value,
					streetName: this.form.get("streetName")?.value,
					city: this.form.get("city")?.value,
					state: this.form.get("state")?.value,
					zip:  this.form.get("zip")?.value
				})
			)
		);

		if (!this.Addresses || this.Addresses.length === 0) {
			await this.retrieveAddresses();
		}


		if (this.Addresses && this.Addresses.length > 0) {
			let aIndex = this.Addresses.findIndex((a) => {
				let p = a.id === address.id;
				let k = String(a.userId) === String(address.userId);

				return  p && k;
			});


			//Remove the delivery address from the localStorage addresses array
			//Then replace it with the changed addresses array.
			if (aIndex > -1) {
				this.Addresses.splice(aIndex, 1);
				this.Addresses.push(address);
			}

						
			//Save the emails as a json object to localStorage
			localStorage.setItem(
				"addresses", 
				GlobalService.encode(
					JSON.stringify(this.Addresses)
				)
			);
		}


		//Declare and assign variables.
		let table:string = "addresses";
		let columnsArray:any = address;
		let where:any = { "userId" : this.user.id, "id": address.id};
		let requiredColumnsArray:any = Object.keys(columnsArray);

		this.database.updateData(table, columnsArray, where, requiredColumnsArray)
			.subscribe((r) => {
				GlobalService.showToast(
					"Message: " + r.message + ". Status: " + r.status + ".",
					"btn-success", 
					this.toastElement.nativeElement.id
				);
				this.router.navigate(['/', 'profile', 'profileDelivery']);
			});
	}
}