import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FoodDetailPageComponent } from './food-detail-page/food-detail-page.component';
@NgModule({
  declarations: [
    FoodComponent,
    FoodDetailPageComponent
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    FontAwesomeModule
  ]
})
export class FoodModule { }
