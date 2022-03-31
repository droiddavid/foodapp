import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { Address } from './address';

@Injectable({
	providedIn: 'root'
})
export class AddressService {

	table:string = "addresses";
	fields:string = "userId";
	localStorageName = "addresses";


	constructor(private database: DatabaseService) { }


	//Get a single address
	getAddress(id:string): Observable<Address> {
		return this.database.getData(this.table, "id", id);
	}


	//Get all addresses for a specific user
	getAddresses(): Observable<Address[]> {
		return this.database.getData(this.table, "userId", GlobalService.User.id);
	}


	//Get the address from the DB.  Return an Observable of type Address.
	getAddressesFromDatabase(): Observable<Address> {
		return this.database.getData(
			this.table, 
			this.fields, 
			GlobalService.User.id
		);
	}


	//Get the address from LocalStorage.  Return a string.
	getAddressesFromLocalStorage(): string | null | object {
		let _addresses = localStorage.getItem(this.localStorageName);

		if (_addresses === null) {
			return null;
		}
		return JSON.parse(GlobalService.decode(_addresses!));
	}

}
