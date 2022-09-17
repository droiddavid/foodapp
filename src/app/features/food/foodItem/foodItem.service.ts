import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { FoodItem } from './foodItem';


@Injectable({
  providedIn: 'root'
})
export class FoodItemService {

	table:string = "food";
	fields:string = "userId";
	localStorageName = "foodItems";

	constructor(private database: DatabaseService) { }

	//Get a single address
	getFoodItem(id:string): Observable<FoodItem> {
		return this.database.getData(this.table, "id", id);
	}


	//Get all food for a specific user
	getFoodItems(): Observable<FoodItem[]> {
		return this.database.getData(this.table, "userId", GlobalService.User.id);
	}


	//Get the foodItems from the DB.  Return an Observable of type FoodItem.
	getFoodItemsFromDatabase(): Observable<FoodItem> {
		return this.database.getData(
			this.table, 
			this.fields, 
			GlobalService.User.id
		);
	}


	//Get the food items from LocalStorage.  Return a string.
	getFoodItemsFromLocalStorage(): string | null | object {
		let _foodItems = localStorage.getItem(this.localStorageName);

		if (_foodItems === null) {
			return null;
		}

		return JSON.parse(GlobalService.decode(_foodItems!));
	}
}