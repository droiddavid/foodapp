import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { PhoneNumber } from './phoneNumber';


@Injectable({
	providedIn: 'root'
})
export class PhoneNumberService {

	table:string = "phoneNumbers";
	fields:string = "userId";
	localStorageName = "phoneNumbers";


	constructor(private database: DatabaseService) { }


	//Get a single phoneNumber
	getPhoneNumber(id:string): Observable<PhoneNumber> {
		return this.database.getData(this.table, "id", id);
	}


	//Get all phoneNumbers for a specific user
	getPhoneNumbers(): Observable<PhoneNumber[]> {
		return this.database.getData(this.table, "userId", GlobalService.User.id);
	}


	//Get the phoneNumber from the DB.  Return an Observable of type PhoneNumber.
	getPhoneNumbersFromDatabase(): Observable<PhoneNumber> {
		return this.database.getData(
			this.table, 
			this.fields, 
			GlobalService.User.id
		);
	}


	//Get the phoneNumber from LocalStorage.  Return a string.
	getPhoneNumbersFromLocalStorage(): string | null | object {

		let _phoneNumbers = localStorage.getItem(this.localStorageName);

		if (_phoneNumbers === null) {
			return null;
		}
		return JSON.parse(GlobalService.decode(_phoneNumbers!));
	}


	insert( recordToInsert:any ): Observable<any> {
		return this.database.insert( recordToInsert );
	}


	//delete
	delete2 ( recordToDelete:any ): Observable<any> {
		return this.database.delete2( recordToDelete );
	};
}
