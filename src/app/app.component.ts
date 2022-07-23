import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { HeaderService } from './services/subjects/header.service';
import { MenuItem } from './types/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	title!:string;
	menuItems!: MenuItem[];
	mItem!: MenuItem;

	constructor(
		private router: Router,
		private headerService: HeaderService ) {
	}

	ngOnInit(): void {
		this.title = 'My Personal Kitchen';
		this.menuItems = [];
		this.changeMenuItemArray(['signup', 'signin']);

		this.headerService.title_$
			.subscribe(title => {
				this.title = title.charAt(0).toUpperCase() + title.slice(1);
			});
		this.headerService.menuItems_$
			.subscribe(menuItem => {
				this.onMenuNavigate(menuItem);
			});
	}

	onTitleChange(event:any) {
		this.title = event.charAt(0).toUpperCase() + event.slice(1);
	}

	onMenuNavigate(event:any) {
		this.menuItems = [];

		let items = new Array<string>();

		switch(event) {

			/* HOME HAMBURGER MENU */
			case 'home': items = []; break;
			case 'signup': items = ['signin']; break;
			case 'signin': items = ['signup']; break;

			/* DASHBOARD HAMBURGER MENU */
			case 'dashboard':
				items = ['home',
					'privacy', 'profile', 
					'delivery', 'emails', 
					'addresses', 'contacts', 
					'invitations', 'orders'];
				break;
			case 'privacy': items = [  'dashboard', 'profile', 'delivery', 'emails', 'addresses', 'contacts', 'invitations', 'orders']; break;
			case 'profile': items = [ 'dashboard', 'privacy', 'delivery', 'emails', 'addresses', 'contacts', 'invitations', 'orders']; break;
			case 'delivery': items = [ 'dashboard', 'privacy', 'profile', 'emails', 'addresses', 'contacts', 'invitations', 'orders']; break;
			case 'emails': items = [ 'dashboard', 'privacy', 'profile', 'delivery', 'addresses', 'contacts', 'invitations', 'orders']; break;
			case 'addresses': items = [ 'dashboard', 'privacy', 'profile', 'delivery', 'emails', 'contacts', 'invitations', 'orders']; break;
			case 'contacts': items = [ 'dashboard', 'privacy', 'profile', 'delivery', 'emails', 'addresses', 'invitations', 'orders']; break;
			case 'invitations': items = [ 'dashboard', 'privacy', 'profile', 'delivery', 'emails', 'addresses', 'contacts', 'orders']; break;
			case 'orders': items = [ 'dashboard', 'privacy', 'profile', 'delivery', 'emails', 'addresses', 'contacts', 'invitations']; break;

			case 'profileEdit': items = [ 'profile']; break;		
		}
		this.changeMenuItemArray(items);
	}

	changeMenuItemArray(menuName:string[]) {
		menuName.forEach(menuItem => {
			let mItem: MenuItem = {
				liClass: "navbar-nav me-auto mb-2 mb-lg-0",
				aClasses: ["nav-item", "nav-link"],
				routerLink: menuItem,
				text: menuItem.charAt(0).toUpperCase() + menuItem.slice(1),
				href: ''
			};
			this.menuItems.push(mItem);
		});
	}
	
	onActivate(event:any) {
		this.router.events.forEach((event) => {
			if(event instanceof NavigationStart) {
				if (event.url === '/') {
					this.menuItems = [];
					this.changeMenuItemArray(['dashboard', 'logout']);
					this.title = 'My Personal Kitchen';
				}
			}
			// NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized
		});
	}
}