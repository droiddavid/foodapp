import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { FoodType } from './food-type';

@Injectable({
  providedIn: 'root'
})
export class FoodTypeService {

	table:string = "foodTypes";
	fields:string = "userId";
	localStorageName = "foodTypes";


	constructor(private database: DatabaseService) { }


	//Get a single address
	getFoodType(id:string): Observable<FoodType> {
		return this.database.getData(this.table, "id", id);
	}


	//Get all addresses for a specific user
	getFoodTypes(): Observable<FoodType[]> {
		return this.database.getData(this.table, "userId", GlobalService.User.id);
	}


	//Get the address from the DB.  Return an Observable of type FoodType.
	getFoodTypesFromDatabase(): Observable<FoodType> {
		return this.database.getData(
			this.table, 
			this.fields, 
			GlobalService.User.id
		);
	}


	//Get the address from LocalStorage.  Return a string.
	getFoodTypesFromLocalStorage(): string | null | object {
		let _foodTypes = localStorage.getItem(this.localStorageName);

		if (_foodTypes === null) {
			return null;
		}
		return JSON.parse(GlobalService.decode(_foodTypes!));
	}
}