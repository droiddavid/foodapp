import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

//Route Guard
import { AuthGuard } from './../shared/guard/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
