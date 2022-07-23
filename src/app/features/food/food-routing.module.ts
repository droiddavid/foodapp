import { FoodDetailPageComponent } from './food-detail-page/food-detail-page.component';
import { FoodComponent } from './food.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FoodComponent
	}, 
	{
		path: 'foodDetailPage/:type',
		component: FoodDetailPageComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
