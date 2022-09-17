import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FoodDetailPageComponent } from './food-detail-page/food-detail-page.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FoodComponent,
    FoodDetailPageComponent,
    FoodListComponent
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class FoodModule { }
