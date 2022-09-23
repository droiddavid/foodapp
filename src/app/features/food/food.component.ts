import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FoodType } from './foodType/food-type';
import { FoodTypeService } from './foodType/food-type.service';

@Component({
	selector: 'app-food',
	templateUrl: './food.component.html',
	styleUrls: ['./food.component.css']
})

export class FoodComponent implements OnInit {

	faPlus = faPlus;
	foodTypes: any;
	addCategoryButton = document.querySelector('#addCategoryButton');

	User = {};

	FoodType: any;
	FoodTypeList = Array<FoodType>();


	constructor(
		private router: Router,
		private foodTypeService: FoodTypeService
	) {}

	ngOnInit(): any {
		if (this.FoodType === undefined) {
			this.FoodType = new FoodType(this.foodTypeService);
		}
		this._getFoodTypes();
	} //ngOnInit



	_getFoodTypes() {

		let _FoodTypes:any = this.FoodType.getFoodTypesFromLocalStorage();

		if ((_FoodTypes === null) || (_FoodTypes.length === 0)) {
			this.FoodType.getFoodTypesFromDatabase()
				.subscribe((data:any) => {

					if (
						(data.message !== "warning" && data.message !== "No data found.") &&
						(data.data.length > 0)
					) {
						this.FoodTypeList = data.data; 
						this.updateFoodTypeFields(this.FoodTypeList);
						this.saveFoodTypesToLocalStorage(this.FoodTypeList);
					} else {
						this.router.navigate(['/', 'foodTypes']);
					}
				});
		} else {
			this.updateFoodTypeFields(this.FoodTypeList);
			this.saveFoodTypesToLocalStorage(this.FoodTypeList);
		}
	}

	//Save the food types as a json object to localStorage
	saveFoodTypesToLocalStorage(foodTypeList:any): void {
		let a:any;
		if (foodTypeList.data && foodTypeList.data.length > 0) {
			a = foodTypeList.data[0];
		}


		//Case 1: a = a.FoodTypeList.data[0]
		if (a !== undefined && typeof a === "object") {
			localStorage.setItem(
				"FoodTypeList", 
				GlobalService.encode(JSON.stringify(a))
			);
			return;
		}


		//Case 2: a = "string value"
		if (a !== undefined && typeof a === "string") {
			localStorage.setItem(
				"FoodTypeList", 
				GlobalService.encode(a)
			);
			return;
		}


		//Case 3: a = {}
		localStorage.setItem(
			"FoodTypeList", 
			GlobalService.encode(JSON.stringify(foodTypeList))
		);
	}
	//Allows objects to update private fields.
	public updateFoodTypeFields(foodTypeList: any) {
		let a:any = (foodTypeList.data && foodTypeList.data.length > 0) ? 
		foodTypeList.data[0] : 
		foodTypeList;
	}



	//showFoodPage(foodType: FoodType) {}
	addFoodItem():void {
		debugger;
	}
	showMeal(platter:any) {
		console.log("platter: " + platter);
		console.table([platter]);
		debugger;
	}
	openRemoveCategoryDialog() {
		debugger;
	}
	showFoodPage(foodType: FoodType) {
		this.router.navigate(['foodList', foodType.type]);
	}
}