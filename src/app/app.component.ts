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
				this.onTitleChange(title);
			});
		this.headerService.menuItems_$
			.subscribe(menuItem => {
				this.onMenuNavigate(menuItem);
			});
	}

	onTitleChange(event:any) {
		switch (event) {
			case 'profilemenu': this.title = 'Profile Menu'; break;
			case 'phonenumber': this.title = 'Phone Number'; break;
			case 'profileEdit': this.title = 'Profile Edit'; break;
			default: this.title = event.charAt(0).toUpperCase() + event.slice(1);
		}
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
			case 'quickstart': items = ['home','dashboard', 'logout']; break;
			case 'dashboard': items = ['home','privacy', 'profile', 'delivery', 'emails', 'addresses', 'hours', 'phonenumbers', 'ecommerce']; break;
			case 'foodcategories': items = ['home','dashboard', 'logout']; break;
			case 'menus': items = ['home','dashboard', 'logout']; break;
			case 'meals': items = ['home','dashboard', 'logout']; break;
			case 'food': items = ['home','dashboard', 'logout']; break;
			case 'contacts': items = ['home','dashboard', 'logout']; break;
			case 'invitations': items = ['home','dashboard', 'logout']; break;
			case 'orders': items = ['home','dashboard', 'logout']; break;

			/* PROFILE HAMBURGER MENU */
			case 'privacy': items = ['profilemenu']; break;

			//PROFILE PROPERTIES PAGE
			case 'profilemenu': items = ['dashboard', 'profile', 'logout']; break;					
			case 'profile': items = ['profilemenu', 'profileEdit']; break;
			case 'profileEdit': items = ['profile']; break;

			case 'delivery': items = ['profilemenu']; break;
			case 'emails': items = [ 'profilemenu', 'emailEdit', 'emailAdd']; break;
			case 'addresses': items = ['profilemenu', 'addAddress']; break;			
			case 'addAddress': items = ['addresses', 'profile']; break;

			case 'hours': items = ['profilemenu']; break;
			case 'phonenumbers': items = ['profilemenu']; break;
			case 'ecommerce': items = ['profilemenu']; break;

			
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
			if (menuItem === 'profilemenu') {
				mItem.text = 'Profile Menu';
			}
			if (menuItem === 'profileEdit') {
				mItem.text = 'Profile - Edit';
			}
			if (menuItem === 'phonenumbers') {
				mItem.text = 'Phone Numbers';
			}

			this.menuItems.push(mItem);
		});

	}
	
	onActivate(event:any) {
		this.router.events.forEach((event) => {
			if (event instanceof NavigationStart) {

				//Clear the menu items array
				this.menuItems = [];

				//Change the menu items array based on the route
				let menu_array: string[] = [];
				switch (event.url) {
					case '/': menu_array = ['dashboard', 'logout']; break;
					case '/profilemenu': menu_array = ['dashboard', 'profile', 'logout']; break; 
					case '/phonenumbers': menu_array = ['dashboard']; break;
					case '/profileEdit': menu_array = ['dashboard', 'profile', 'logout']; break;
					case '/privacy': menu_array = ['dashboard', 'profilemenu', 'logout']; break;
					default: menu_array = ['dashboard', 'logout'];
				}

				//effect the menu item change
				this.changeMenuItemArray(menu_array);

				//Change the title
				this.onTitleChange(event.url.split('/')[1]);
			}
			// NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized
		});
	}
}