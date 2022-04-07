import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { Hour } from './hour';

@Injectable({
	providedIn: 'root'
})
export class HoursService {

	table:string = "hours";
	fields:string = "userId";
	localStorageName = "hours";


	constructor(private database: DatabaseService) { }


	//Get a single Hour
	getHour(id:string): Observable<Hour> {
		return this.database.getData(this.table, "id", id);
	}


	//Get all hours for a specific user
	getHours(): Observable<Hour[]> {
		return this.database.getData(this.table, "userId", GlobalService.User.id);
	}


	//Get the address from the DB.  Return an Observable of type Hour.
	getHoursFromDatabase(): Observable<Hour> {
		return this.database.getData(
			this.table, 
			this.fields, 
			GlobalService.User.id
		);
	}


	//Get the address from LocalStorage.  Return a string.
	getHoursFromLocalStorage(): string | null | object {
		let _hours = localStorage.getItem(this.localStorageName);

		if (_hours === null) {
			return null;
		}
		return JSON.parse(GlobalService.decode(_hours!));
	}


	//insert
	insert( recordToInsert:any ): Observable<any> {
		return this.database.insert( recordToInsert );
	}


	//delete
	delete2 ( recordToDelete:any ): Observable<any> {
		return this.database.delete2( recordToDelete );
	};


	//update
	update(table:string, columnsArray: Array<string>, where: string, requiredColumnsArray: Array<string>) {
		return this.database.updateData(table, columnsArray, where, requiredColumnsArray);
	}
}