import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatterDetailComponent } from './platter-detail/platter-detail.component';
import { PlattersComponent } from './platters.component';

const routes: Routes = [
	{ path: 'platters', component: PlattersComponent },
	{ path: 'platterDetail/:id', component: PlatterDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlattersRoutingModule { }
