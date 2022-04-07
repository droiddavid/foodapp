import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { HoursService } from '../hours.service';
import { Hour } from '../hour';
import { DateTime } from '../date-time';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.css']
})
export class AddHoursComponent implements OnInit {

	@ViewChild('toastElement') toastElement!:ElementRef;
	@ViewChild('date') date!:ElementRef;
	@ViewChild('hourOpen') hourOpen!:ElementRef;
	@ViewChild('hourClosed') hourClosed!:ElementRef;

	form: FormGroup;
	hour!: Hour;
	Hours!: Array<Hour>;
	Schedule!: any;
	private dateTime!: DateTime;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private hoursService: HoursService) {
		this.form = this.formBuilder.group({
			date: 		['', [ Validators.required ]],
			hourOpen: 	['', [ Validators.required ]],
			hourClosed: 	['', [ Validators.required ]]
		});
	}

	ngOnInit(): void {
		if (this.Hours === undefined) {
			this.hoursService.getHours()
				.subscribe((response) => {
					let temp = JSON.parse(JSON.stringify(response));
					this.Hours = temp.data;
				});
		}

	}

	onSubmit() {

		let date = this.date.nativeElement.value;
		let hourOpen = this.hourOpen.nativeElement.value;
		let hourClosed = this.hourClosed.nativeElement.value;

		this.dateTime = new DateTime(new Date(date));

		var dt = new Date(this.dateTime.date);

		let _month = dt.getMonth();
		_month = _month + 1;
		this.dateTime.month = String(_month); 

		let _day = dt.getDay();
		_day = _day + 1;
		this.dateTime.day = String(_day);

		this.dateTime.year = dt.getFullYear();

		this.dateTime.openString = this.dateTime.convertHourToString(hourOpen);
		this.dateTime.closedString = this.dateTime.convertHourToString(hourClosed);


		var d = new Date(this.dateTime.month + '/' + this.dateTime.day + '/' + this.dateTime.year);
		var dayOfWeekNumber = d.getUTCDay();
		var dayAbbreviation = this.dateTime.dayName(dayOfWeekNumber);

		this.Schedule = {
			"table": "hours", "userId": GlobalService.User.id, "sequenceOrder": 0,
			"month": this.dateTime.month, "date": this.dateTime.month + '/' + this.dateTime.day + '/' + this.dateTime.year,
			"day": this.dateTime.day, "dayName": dayAbbreviation, "year": this.dateTime.year,
			"hourOpen": this.dateTime.openString, "hourClosed": this.dateTime.closedString,
			"displayToPublic": 1
		};

		if (this.Hours === undefined) this.Hours = [];

		let hour = new Hour(this.hoursService);
		hour.date = this.Schedule.date; 

		let index = this.Hours.findIndex(function (_hour) {
			return _hour.date === hour.date;
		});
		if (index > -1) {
			GlobalService.showToast(
				"That date already exists.", 
				"btn-danger", 
				this.toastElement.nativeElement.id
			);
			return;
		}

		this.hoursService.insert(this.Schedule)
			.subscribe(() => {

				delete this.Schedule.table;

				this.Hours.push(this.Schedule);
				//Save the emails as a json object to localStorage
				localStorage.setItem(
					"hours", 
					GlobalService.encode(
						JSON.stringify(this.Hours)
					)
				);

				this.router.navigate(['/', 'profile', 'profileHours']);
			});
	}
}