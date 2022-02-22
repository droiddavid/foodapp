import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';

const routes: Routes = [

	//Home Route
	{	path: '', component: HomeLayoutComponent,
		children: [{
				path: '',
				redirectTo: '/home',
				pathMatch: 'full'},{
				path: 'home',
				loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}]
	},
	//App Route
	{	path: '', component: DashboardLayoutComponent,
		children: [{
				path: 'dashboard',
				redirectTo: '/dashboard',
				pathMatch: 'full'},{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)}]
	},
	//Auth Route
	{
		path: 'auth',
		component: AuthLayoutComponent,
		children: [
			{
				path: '',
				redirectTo: '/auth',
				pathMatch: 'full'
			},
			{
				path: 'auth',
				loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
