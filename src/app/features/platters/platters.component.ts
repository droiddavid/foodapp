import { DatabaseService } from './../../services/database/database.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Platter } from './types/platter';
import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
	selector: 'app-platters',
	templateUrl: './platters.component.html',
	styleUrls: ['./platters.component.css']
})
export class PlattersComponent implements OnInit {

	@ViewChild('toastElement') toastElement!: ElementRef;

	faTimes = faTimes;
	faChevronRight = faChevronRight;

	//create a new array of type Platter named Platters
	Platters: Platter[] = [];

	constructor(
		private router: Router,
		private database: DatabaseService
	) { }

	ngOnInit(): void {
		this._getPlatters();
	}

	//create a method to get the platters from the database
	_getPlatters() {
		//check if Platters is in localStorge, if it is, set Platters to the value in localStorge, if not, get the platters from the database
		if (localStorage.getItem('Platters')) {
			this.Platters = JSON.parse(localStorage.getItem('Platters')!);
		} else {
			this.database.getData('platters', 'userid', GlobalService.User.id)
				.subscribe((response: any) => {
					this.Platters = response.data;
				
					//save this.Platters to local storage
					localStorage.setItem('Platters', JSON.stringify(this.Platters));
				});
		}
	}

	onDelete(platter: Platter) {
		//delete the platter from the database
		this.database.delete({
			"table" : "platters",
			"fieldName" : "id",
			"fieldValue" : platter.id
		})
			.subscribe((response: any) => {
				let status:string, message:string;

				if (response.status === 'success') {
					status = 'Success';
					message = 'Platter deleted successfully.';
				} else {
					status = 'Error';
					message = 'Platter could not be deleted.';
				}
				GlobalService.showToast(
					status + " - " + message, 
					"btn-success",
					this.toastElement.nativeElement.id
				);
			});
	

		//remove the platter from the platterItems table in the database
		let deletePlatterItemObject = {
			"table" : "platterItems",
			"firstFieldName" : "userId",
			"firstFieldValue" : GlobalService.User.id,
			"secondFieldName" : "platterId",
			"secondFieldValue" : platter.id
		}
		this.database.delete2(deletePlatterItemObject)
			.subscribe((response: any) => {
				let status:string, message:string;

				if (response.status === 'success') {
					status = 'Success';
					message = 'Platter item deleted successfully.';
				} else {
					status = 'Error';
					message = 'Platter item could not be deleted.';
				}
				GlobalService.showToast(
					status + " - " + message, 
					"btn-success",
					this.toastElement.nativeElement.id
				);
			});	
	

		//remove the platter from the menuItems table in the database
		let deleteMenuItemObject = {
			"table" : "menuItems",
			"firstFieldName" : "userId",
			"firstFieldValue" : GlobalService.User.id,
			"secondFieldName" : "platterId",
			"secondFieldValue" : platter.id
		}
		this.database.delete2(deleteMenuItemObject)
			.subscribe((response: any) => {
				let status:string, message:string;

				if (response.status === 'success') {
					status = 'Success';
					message = 'Menu item deleted successfully.';
				} else {
					status = 'Error';
					message = 'Menu item could not be deleted.';
				}
				GlobalService.showToast(
					status + " - " + message, 
					"btn-success",
					this.toastElement.nativeElement.id
				);
			});


		//splice the platter from this.Platters
		this.Platters.splice(this.Platters.indexOf(platter), 1);

		//save this.Platters to local storage
		localStorage.setItem('Platters', JSON.stringify(this.Platters));
	}

	showPlatter(platter: Platter) {
		//save the platter to local storage
		localStorage.setItem('Platter', JSON.stringify(platter));

		//Resolve platter items for the current platter
		let obj = {
			table: 'platterItems',
			firstFieldName: 'userId',
			firstFieldValue: GlobalService.User.id,
			secondFieldName: 'platterId',
			secondFieldValue: platter.id
		};
		this.database.select2(obj)
			.subscribe((response: any) => {
				//save the platter items to local storage
				localStorage.setItem('PlatterItems', JSON.stringify(response.data));

				//if response.data is not empty, null or undefined, 
				//then create a comma separated string of the platter item ids
				if (response.data) {
					let platterItemIds = response.data.map((platterItem: any) => platterItem.foodId).join(',');

					//use the databaase service's selectIn method to get the food items using platterItemIds as the value for the fieldList field
					this.database.selectIn('food', 'id', platterItemIds)
						.subscribe((response: any) => {
							//save the food items to local storage
							localStorage.setItem('FoodItems', JSON.stringify(response.data));

							//navigate to the platter page
							this.router.navigate(['platterDetail', platter.id]);
						}
					);
				} else {
					return;	
				}
			});
	}
}