import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Hour } from './hour';
import { HoursService } from './hours.service';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
	selector: 'app-profile-hours',
	templateUrl: './profile-hours.component.html',
	styleUrls: ['./profile-hours.component.css']
})
export class ProfileHoursComponent implements OnInit {

	@ViewChild('toastElement') toastElement!: ElementRef;

	faTimes = faTimes;
	faPlus = faPlus;

	Hour!: Hour;
	Hours: any;


	constructor(
		private router: Router,
		private hoursService: HoursService
	) {}
	ngOnInit(): void {
		if (this.Hour === undefined) {
			this.Hour = new Hour(this.hoursService);
		}
		this._getHours();
	}


	_getHours() {
		this.Hours = null;
		this.Hours = this.Hour.getHoursFromLocalStorage();

		if (this.Hours === null) {

			this.Hour.getHoursFromDatabase()
				.subscribe((data:any) => {

					if (
						(data.message !== "warning" && data.message !== "No data found.") &&
						(data.data.length > 0)
					) {
						this.Hours = data.data; 
						this.saveToLocalStorage(this.Hours);
					} else {
						this.router.navigate(['/', 'profile', 'addHour']);
					}

				});

		} else {
			this.saveToLocalStorage(this.Hours);
		}
	}


	//Save the hour as a json object to localStorage
	saveToLocalStorage(hour:any): void {
	
		let h:any;
		if (hour.data && hour.data.length > 0) {
			h = hour.data[0];
		}


		//Case 1: h = h.hour.data[0]
		if (h !== undefined && typeof h === "object") {
			localStorage.setItem(
				"hours", 
				GlobalService.encode(JSON.stringify(h))
			);
			return;
		}


		//Case 2: h = "string value"
		if (h !== undefined && typeof h === "string") {
			localStorage.setItem(
				"hours", 
				GlobalService.encode(h)
			);
			return;
		}


		//Case 3: h = {}
		localStorage.setItem(
			"hours", 
			GlobalService.encode(JSON.stringify(hour))
		);
	}




	editCheckbox(schedule:any) {

		let sIndex = this.Hours.findIndex((hour:any) => hour.id === schedule.id);

		if (sIndex > -1) {
			let hour = this.Hours[sIndex];
			hour.displayToPublic = (hour.displayToPublic === 1) ? 0 : 1;

			let hIndex = this.Hours.findIndex((hr:any) => hr.id === hour.id);
			if (hIndex > -1) {

				this.Hours[hIndex] = JSON.parse(JSON.stringify(hour));
			}

			//update in db
			let obj = { "displayToPublic": hour.displayToPublic };
			let table = "hours",
				columnsArray:any = obj,
				where:any = {
					"id" : hour.id
				},
				requiredColumnsArray:any = Object.keys(obj);

			if (table && columnsArray && where && requiredColumnsArray) {
				this.hoursService.update(table, columnsArray, where, requiredColumnsArray)
					.subscribe((r:any) => {
						GlobalService.showToast(
							r.message + ": " + r.status,
							"btn-success",
							this.toastElement.nativeElement.id
						);
					});

			} //if

		} //if

		schedule.displayToPublic = (schedule.displayToPublic === 1) ? 0 : 1;
	};


	addSchedule() { 
		this.router.navigate(['/', 'profile', 'addHours']);
	}


	removeSchedule(schedule:any) {
		try {
			let ScheduleToDelete = {
				"table" : "hours",
				"firstFieldName" : "userId",
				"firstFieldValue" : GlobalService.User.id,
				"secondFieldName" : "id",
				"secondFieldValue" : schedule.id
			}
			this.hoursService.delete2(ScheduleToDelete)
				.subscribe((response) => {

					GlobalService.showToast(
						schedule.date + ' was deleted. [STATUS: ' + response.status + "]", 
						"btn-success",
						this.toastElement.nativeElement.id
					);

					//Remove phone number from the User's phone number array.
					let pIndex = this.Hours.findIndex((p:any) => {
						return p.id === schedule.id;
					});

					if (pIndex > -1) {
						this.Hours.splice(pIndex, 1);
					}

					//UPDATE LOCALSTORAGE
					this.saveToLocalStorage(this.Hours);
				});

		} catch ( error ) {
			GlobalService.showToast(
				"Delete Failed.  An error occurred.", 
				"btn-danger",
				this.toastElement.nativeElement.id
			);
			return error;
		}
	}
}