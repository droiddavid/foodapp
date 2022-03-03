import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from './../../../services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	
	@ViewChild('body') body!: ElementRef;

	Profile = {
		"firstName" : "First Name",
		"lastName" : "Last Name", 
		"company" : "Company",
		"description" : "Description",
		"message" : "Message",
		"tagsString" : "Tags String",
		"hasDelivery" : "Has Delivery",
		"deliveryRange" : "Delivery Range",
		"country" : "Country"
	};

	user: any;

	constructor() { }

	ngOnInit(): any {
	}

	displayEditForm(): void {
		console.log("displaying edit form");
	}

}
