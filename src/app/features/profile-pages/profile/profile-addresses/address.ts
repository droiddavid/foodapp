import { AddressService } from './address.service';


export class Address {

	private _id!: number;
	private _userId!: string;
	private _addressLine1!: string;
	private _addressLine2!: string;
	private _city!: string;
	private _state!: string;
	private _zip!: string;
	private _addressType!: string;

	addresses!: Array<Address>;

	table: string = "addresses";
	fields: string = "userId";
	localStorageName: string = "addresses";


	constructor(private addressService: AddressService) {}


	getAddresses() {
		return this.addressService.getAddresses();
	}
	getAddressesFromLocalStorage(): string | null | object {
		return this.addressService.getAddressesFromLocalStorage();
	}
	//Get the address from the DB.  Return an Observable of type Address.
	getAddressesFromDatabase() {
		return this.addressService.getAddressesFromDatabase()
	}


	//Get the address from LocalStorage.  Return a string.
	// getAddressesFromLocalStorage(): string | null {
	// 	let _address = localStorage.getItem(this.localStorageName);
	// 	debugger;

	// 	if (_address === null) {
	// 		return null;
	// 	}
	// 	return JSON.parse(GlobalService.decode(_address!));
	// }


	public get id() { return this._id; }
	public set id(value: any) {
		this._id = value;
	}

	public get userId() { return this._userId; }
	public set userId(value: any) {
		this._userId = value;
	}

	public get addressLine1() { return this._addressLine1; }
	public set addressLine1(value: any) {
		this._addressLine1 = value;
	}

	public get addressLine2() { return this._addressLine2; }
	public set addressLine2(value: any) {
		this._addressLine2 = value;
	}

	public get city() { return this._city; }
	public set city(value: any) {
		this._city = value;
	}

	public get state() { return this._state; }
	public set state(value: any) {
		this._state = value;
	}

	public get zip() { return this._zip; }
	public set zip(value: any) {
		this._zip = value;
	}

	public get addressType() { return this._addressType; }
	public set addressType(value: any) {
		this._addressType = value;
	}
}