import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { FoodItem } from '../../food/foodItem/foodItem';
import { Platter } from '../types/platter';
import { PlatterItem } from '../types/platter-item';

@Component({
	selector: 'app-platter-detail',
	templateUrl: './platter-detail.component.html',
	styleUrls: ['./platter-detail.component.css']
})
export class PlatterDetailComponent implements OnInit {

	@ViewChild('toastElement') toastElement!: ElementRef;

	Platter!: Platter;
	PlatterItems: PlatterItem[] = [];
	FoodItems = new Array<FoodItem>();
	message!: string;
	hasError: boolean = false;

	/**
	 * name
	 * description
	 * status
	 * lastUpdate
	 * image
	 * displayAsSpectial"
	 */

	constructor(private router: Router) {}

	ngOnInit(): void {

		//check if Platter is in local storage
		if (localStorage.getItem('Platter')) {
			this.Platter = JSON.parse(localStorage.getItem('Platter')!);

			//convert the date from a number to a date string.
			this.Platter.lastUpdate = this.convertDate(this.Platter.lastUpdate);
		} else {
			this.hasError = true;
			this.message = "Error: Platter not fouund";
		}

		if (localStorage.getItem('PlatterItems')) {
			this.PlatterItems = JSON.parse(localStorage.getItem('PlatterItems')!);
		} else {
			this.hasError = true;
			this.message = "Error: PlatterItems not fouund";
		}

		if (localStorage.getItem('FoodItems')) {
			this.FoodItems = JSON.parse(localStorage.getItem('FoodItems')!);
		} else {
			this.hasError = true;
			this.message = "Error: FoodItems not fouund";
		}

		if(this.hasError) {
			this.showToast(this.message);
			this.router.navigate(['platters']);
		}
	}

	//function to convert 1550968628198 to 2020-02-20 12:30:28
	convertDate(date: number) {
		let d = new Date(date);
		let year = d.getFullYear();
		let month = d.getMonth() + 1;
		let day = d.getDate();
		let hours = d.getHours();
		let minutes = d.getMinutes();
		let seconds = d.getSeconds();

		let dateString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

		return dateString;
	}


	showToast(message: string) {
		GlobalService.showToast(
			message,
			"btn btn-danger",
			this.toastElement.nativeElement.id
		);
	}

	onSubmit(formPlatter: { value: any; }) {
		debugger;
		console.log('submit');
		console.table([formPlatter.value]);
		console.log(formPlatter.value);
	}

}
