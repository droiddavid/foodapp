import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { FoodItem } from '../foodItem/foodItem';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

	foodType!: any;
	FoodItems: any;
	/*	
		that.FoodItems = that.Factories.FoodItemFactory;
		that.FoodItems.sort((a, b) => (a.name > b.name) ? 1 : -1);
	*/
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private database: DatabaseService
	) { }

	ngOnInit(): void {
		this.activatedRoute.params
			.subscribe((params: { [x: string]: any; }) => {

				this.foodType = params['type'];

				let foodItems = this.database.getData('food', 'type', this.foodType);

				foodItems
					.subscribe((response: any) => {
						this.FoodItems = response.data;
						this.FoodItems.sort((a: { name: number; }, b: { name: number; }) => (a.name > b.name) ? 1 : -1);
					}
			);
		})
	}

	showDetailPage(foodItem: FoodItem) {
		this.router.navigate(['foodDetailPage/', foodItem.id]);
	}

	addFoodItem() {
		this.router.navigate(['addFoodItem']);
	}

}
