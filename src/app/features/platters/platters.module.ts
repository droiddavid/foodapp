import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlattersRoutingModule } from './platters-routing.module';
import { PlattersComponent } from './platters.component';
import { PlatterItemsComponent } from './platter-items/platter-items.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlatterDetailComponent } from './platter-detail/platter-detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		PlattersComponent,
		PlatterItemsComponent,
		PlatterDetailComponent,
	],
	imports: [
		CommonModule,
		PlattersRoutingModule,
		FontAwesomeModule,
		FormsModule
	]
})
export class PlattersModule { }
