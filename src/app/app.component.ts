import { AfterViewInit, Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { HeaderService } from './services/subjects/header.service';
import { MenuItem } from './types/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

	title!:string;
	menuItems!: MenuItem[];
	mItem!: MenuItem;

	appHeader!: any;
	appSpacer!: any;

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

	ngAfterViewInit(): void {
		this.appHeader = document.querySelector('app-header');
		let appHeaderHeight = this.appHeader.firstChild.clientHeight;

		this.appSpacer = document.querySelector('#spacer');
		this.appSpacer.style.height = appHeaderHeight + 'px';
	}

	onTitleChange(event:any) {
		switch (event) {
			case 'profilemenu': this.title = 'Profile Menu'; break;
			case 'phonenumber': this.title = 'Phone Number'; break;
			case 'profileEdit': this.title = 'Profile Edit'; break;
			case 'addAddress': this.title = 'Add Address'; break;
			case 'emailAdd': this.title = 'Add Email'; break;
			case 'emailEdit': this.title = 'Edit Email'; break;
			case 'profileDelivery': this.title = 'Profile Delivery'; break;
			case 'profileHours': this.title = 'Profile Hours'; break;
			case 'profileEcommerce': this.title = 'Profile Ecommerce'; break;
			case 'profilePrivacy': this.title = 'Profile Privacy'; break;
			case 'foodcategories': this.title = 'Food Categories'; break;
			case 'addDelivery': this.title = 'Add Delivery'; break;
			case 'addHours': this.title = 'Add Hours'; break;
			case 'addEcommerce': this.title = 'Add Ecommerce'; break;
			case 'addPrivacy': this.title = 'Add Privacy'; break;
			case 'addPhonenumber': this.title = 'Add Phone Number'; break;
			case 'addContact': this.title = 'Add Contact'; break;
			case 'addMeal': this.title = 'Add Meal'; break;
			case 'addMenu': this.title = 'Add Menu'; break;
			case 'addFood': this.title = 'Add Food'; break;
			case 'addFoodCategory': this.title = 'Add Food Category'; break;
			case 'addEmailAddress': this.title = 'Add Email Address'; break;
			

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
			case 'addDelivery': items = ['profilemenu']; break;
			case 'emails': items = ['profilemenu', 'emailEdit', 'emailAdd']; break;
			case 'addEmailAddress': items = ['profilemenu']; break;


			case 'profileAddresses': items = ['profilemenu', 'addAddress']; break;			
			case 'addAddress': items = ['addresses', 'profile']; break;

			case 'profileHours': items = ['profilemenu']; break;
			case 'profilePhonenumbers': items = ['profilemenu']; break;
			case 'profileEcommerce': items = ['profilemenu']; break;

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
			switch (menuItem) {
				case 'profilemenu': mItem.text = 'Profile Menu'; break;
				case 'profileEdit': mItem.text = 'Profile Edit'; break;
				case 'phonenumbers': mItem.text = 'Phone Numbers'; break;
				case 'addAddress': mItem.text = 'Add Address'; break;
				case 'addEmailAddress': mItem.text = 'Add Email'; break;
				case 'emailEdit': mItem.text = 'Edit Email'; break;
				case 'profileDelivery': mItem.text = 'Profile Delivery'; break;
				case 'profileHours': mItem.text = 'Profile Hours'; break;
				case 'profileEcommerce': mItem.text = 'Profile Ecommerce'; break;
				case 'profilePrivacy': mItem.text = 'Profile Privacy'; break;
				case 'foodcategories': mItem.text = 'Food Categories'; break;
				case 'addDelivery': mItem.text = 'Add Delivery'; break;
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
					case '/addDelivery': menu_array = ['dashboard', 'profilemenu', 'logout']; break;
					case '/profileEmailAddresses': menu_array = ['dashboard', 'profilemenu', 'logout']; break;
					case '/emails': menu_array = ['dashboard', 'profilemenu', 'logout']; break;
					case '/addEmailAddress': menu_array = ['dashboard', 'emails', 'logout']; break;
					case '/addAddress': menu_array = ['dashboard', 'profileAddresses', 'logout']; break;
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