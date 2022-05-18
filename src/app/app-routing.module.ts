import { FoodLayoutComponent } from './layout/food-layout/food-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProfileLayoutComponent } from './layout/profile-layout/profile-layout.component';

//Auth Guard
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [

	//Home Route
	{	path: '', component: HomeLayoutComponent,
		children: [
			{
				path: '',
				redirectTo: '/home',
				pathMatch: 'full'
			},
			{
				path: 'home',
				loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
			}
		]
	},
	//App Route
	{	path: '', component: DashboardLayoutComponent,
		children: [
			{
				path: 'dashboard',
				redirectTo: '/dashboard',
				pathMatch: 'full'
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			}
		]
	},
	//Profile Route
	{	path: '', component: ProfileLayoutComponent,
		children: [
			{
				path: 'profile',
				redirectTo: '/profile',
				pathMatch: 'full'
			},
			{
				path: 'profile',
				loadChildren: () => import('./features/profile-pages/profile/profile.module').then(m => m.ProfileModule)
			}
		]
	},
	//Food Route
	{
		path: '', component: FoodLayoutComponent,
		children: [
			{
				path: 'food',
				redirectTo: '/food',
				pathMatch: 'full'
			},
			{
				path: 'food',
				loadChildren: () => import('./features/food/food.module').then(m => m.FoodModule)
			}
		]
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
