import { HeaderService } from './../../../../services/subjects/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { faHome } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {

	Menus: MenuItem[] = [];
	classes_default: string ="list-group-item list-group-item animated fadeInRight";
	classes_success: string ="list-group-item list-group-item-success animated fadeInRight";
	styles: string ="border-bottom: 1px solid #ffffff; font-size: x-large;";


	//faHome = faHome;
	constructor(
		private router: Router,
		private headerService: HeaderService
	) { }

	ngOnInit(): void {
		this.displayMenu();
	}
	
	displayMenu(): void {
		this.addMenuItem("privacy", this.classes_default, this.styles, "fas fa-rocket", "Privacy", "Change your privacy settings.");
		this.addMenuItem("profile", this.classes_success, this.styles, "fas fa-users", "Profile","Manage your profile.  Add a logo, addresses, open and close times, etc.");
		this.addMenuItem("delivery", this.classes_default, this.styles, "fas fa-chart-line", "Delivery", "Manage your delivery information.");
		this.addMenuItem("emails", this.classes_success, this.styles, "fas fa-file-alt", "Emails", "Manage your emails.");
		this.addMenuItem("addresses", this.classes_default, this.styles, "fas fa-utensils", "Addresses", "Manage your addresses.");
		this.addMenuItem("hours", this.classes_success, this.styles, "fas fa-file-invoice", "Hours", "Manage your opening and closing times.");
		this.addMenuItem("profilePhoneNumbers", this.classes_default, this.styles, "fas fa-file-invoice", "Phone Numbers", "Manage your phone numbers.");
		this.addMenuItem("ecommerce", this.classes_success, this.styles, "fas fa-file-invoice", "E-commerce Setup", "Set up your ecommerce account to get paid.");
	}
	addMenuItem(url:string, classes:string, style:string, icon:string, heading:string, text:string) {
		this.Menus.push(new MenuItem(
			url, classes, 
			style, icon, 
			heading, text
		));
	};


	manage(page: string) {

		//may be deprecated.  check this...
		localStorage['previous_state'] = "dashboard";
		
		//emit title and menu to the header service.
		this.headerService.changeTitle(page);
		this.headerService.changeMenuItems(page);

		this.router.navigate(['/', page]);
	};

	showProfilePage(page:string) {
		this.router.navigate(['/', 'profile', page]);
	}

}
