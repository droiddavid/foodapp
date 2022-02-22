import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';


interface Menu {
	url: string; 
	classes: string; 
	style: string; 
	icon: string; 
	heading: string; 
	text:string	
}

class MenuItem implements Menu {
	url: string = "";
	classes: string = "";
	style: string = "";
	icon: string = "";
	heading: string = "";
	text: string = "";

	constructor(url:string, classes:string, style:string, icon:string, heading:string, text:string) {
		this.url = url;
		this.classes = classes;
		this.style = style;
		this.icon = icon;
		this.heading = heading;
		this.text = text;
	}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	user: any;


	//page main menu
	Menus: MenuItem[] = [];
	classes_default: string ="list-group-item list-group-item animated fadeInRight";
	classes_success: string ="list-group-item list-group-item-success animated fadeInRight";
	styles: string ="border-bottom: 1px solid #ffffff; font-size: x-large;";


	faHome = faHome;

	constructor(private router: Router) { }

	ngOnInit(): any {
		if (!(localStorage.getItem('user'))) {
			return {
				"name": "Error",
				"message": "Cannot find user in local storage."}
		}

		let localStorageUser: string | null = localStorage.getItem('user');

		if (!(this.user) && localStorageUser) {
			this.user = JSON.parse(GlobalService.decode(localStorage.getItem('user')!));
			this.displayMenu();
		} }

	goToAuth(): void {
		this.router.navigate(['auth']);
	}
	displayMenu(): void {
		this.addMenuItem("quickstart", this.classes_default, this.styles, "fas fa-rocket", "Quick Start", "Add Menus, Meals and Food quickly.");
		this.addMenuItem("profile", this.classes_success, this.styles, "fas fa-users", "Profile","Manage your profile.  Add a logo, addresses, open and close times, etc.");
		this.addMenuItem("foodTypes", this.classes_default, this.styles, "fas fa-chart-line", "Food Categories", "Manage your food categories like 'Vegetables', 'Pasta', etc.");
		this.addMenuItem("menus", this.classes_success, this.styles, "fas fa-file-alt", "Menus", "Manage your menus. Create menus, add meals and sides.");
		this.addMenuItem("platters", this.classes_default, this.styles, "fas fa-utensils", "Meals", "Assemble meals from your food and sides. Sell your meals individually or on menus.");
		this.addMenuItem("food", this.classes_success, this.styles, "fas fa-hamburger", "Food", "Create sides for your menus and for building your meals and platters.");
		this.addMenuItem("contacts", this.classes_default, this.styles, "fas fa-file-invoice", "Contacts", "Manage your contacts. Add name and phone numbers you can to send invitations by text message.");
		this.addMenuItem("invitations", this.classes_success, this.styles, "fas fa-file-invoice", "Invitations", "Create and send invitations to your contacts.");
		//this.addMenuItem("memberships", this.classes_default, this.styles, "fas fa-users", "Memberships", "Create memberships private offerings like a book club, wedding shower, etc.");
		this.addMenuItem("orders", this.classes_default, this.styles, "fas fa-shopping-cart", "Orders", "Handle your orders.");
		//this.addMenuItem("orderDetails", this.classes_success, this.styles, "fas fa-chart-line", "Order Details", "Details for Orders.  Order details.");
		//this.addMenuItem("reports", this.classes_default, this.styles, "fas fa-chart-line", "Reports", "Know your business.  Monitor your business intelligence.");
	}
	addMenuItem(url:string, classes:string, style:string, icon:string, heading:string, text:string) {
		this.Menus.push(new MenuItem(
			url, classes, 
			style, icon, 
			heading, text
		));
	};


	manage(page: string) {
		localStorage['previous_state'] = "cookDashboard";
		this.router.navigate(['/', 'dashboard', page]);
	};

}
