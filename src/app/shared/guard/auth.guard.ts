import { Injectable } from '@angular/core';
import { 
	ActivatedRouteSnapshot, 
	CanActivate, 
	RouterStateSnapshot, 
	UrlTree,
	Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';


@Injectable({
	providedIn: 'root'
})


export class AuthGuard implements CanActivate {
	constructor(
		public authService: AuthService,
		public router: Router
	) { }
	canActivate(
		_next: ActivatedRouteSnapshot, //route
		_state: RouterStateSnapshot
	): 
		Observable<boolean | UrlTree> | 
		Promise<boolean | UrlTree> | 
		boolean | 
		UrlTree {
		
		if(this.authService.isLoggedIn !== true) {
			this.router.navigate(['home/signin'])
		}
		return true;
	}
}