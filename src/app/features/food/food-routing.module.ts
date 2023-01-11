import { FoodComponent } from './food.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodDetailPageComponent } from './food-detail-page/food-detail-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoodItemComponent } from './add-food-item/add-food-item.component';

const routes: Routes = [
	{
		path: 'food',
		component: FoodComponent
	},
	{
		path: 'foodList/:type',
		component: FoodListComponent
	},
	{
		path: 'foodDetailPage/:foodItem',
		component: FoodDetailPageComponent
	},
	{
		path: 'addFoodItem',
		component: AddFoodItemComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
