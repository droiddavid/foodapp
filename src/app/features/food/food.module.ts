import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food.component';

import { FoodDetailPageComponent } from './food-detail-page/food-detail-page.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFoodItemComponent } from './add-food-item/add-food-item.component';
@NgModule({
  declarations: [
    FoodComponent,
    FoodDetailPageComponent,
    FoodListComponent,
    AddFoodItemComponent
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FoodModule { }
