import { FoodComponent } from './food.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodDetailPageComponent } from './food-detail-page/food-detail-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
