export class DateTime {

	year!: number;
	month!: string;
	day!: string;
	date!: Date;
	open!: number;
	closed!: number;
	openString!: string;
	closedString!: string;

	constructor(date: Date) {
		this.date = date;
	}


	getYear(yr: any) {
		//What type is yr?
		yr = yr + ""; //convert to string.
		var _yr = yr.substring(2, 4);

		return this.year = _yr;
	}


	getMonth(m: number): String {
		m++;

		// Jan = 0
		this.month = 
			( m <= 9 ) ? 
				String("0" + m) : 
				String(m + "");

		return String(this.month);
	}


	getDay(d: number) {
		return this.day = (d <= 9) ? "0" + d : d + "";
	}


	convertHourToString(hr: string) {

		let h = hr.split(":")[0];

		//1 thru 24hrs - $index holds row label
		switch (h) {
			case "1" : h = "1am"; break;
			case "2" : h = "2am"; break;
			case "3" : h = "3am"; break;
			case "4" : h = "4am"; break;
			case "5" : h = "5am"; break;
			case "6" : h = "6am"; break;
			case "7" : h = "7am"; break;
			case "8" : h = "8am"; break;
			case "9" : h = "9am"; break;
			case "01" : h = "1am"; break;
			case "02" : h = "2am"; break;
			case "03" : h = "3am"; break;
			case "04" : h = "4am"; break;
			case "05" : h = "5am"; break;
			case "06" : h = "6am"; break;
			case "07" : h = "7am"; break;
			case "08" : h = "8am"; break;
			case "09" : h = "9am"; break;
			case "10" : h = "10am"; break;
			case "11" : h = "11am"; break;
			case "12" : h = "12am"; break;
			case "13" : h = "1pm"; break;
			case "14" : h = "2pm"; break;
			case "15" : h = "3pm"; break;
			case "16" : h = "4pm"; break;
			case "17" : h = "5pm"; break;
			case "18" : h = "6pm"; break;
			case "19" : h = "7pm"; break;
			case "20" : h = "8pm"; break;
			case "21" : h = "9pm"; break;
			case "22" : h = "10pm"; break;
			case "23" : h = "11pm"; break;
			case "24" : h = "12pm"; break;
		}

		return h;
	}


	getOpenHour(o: any) {
		//o is Date object
		return this.convertHourToString(o);
	}


	getClosedHour(c: any) {
		//c is Date object
		return this.convertHourToString(c);
	}


	dateString() {
		let d = this.month + "/" + this.day + "/" + this.year;
		return d;
	}


	timeString() {
		let t = this.open + " to " + this.closed;

		return t;
	}


	dayName(date: any) {
		let days = ["Su", "M", "T", "W", "Th", "F", "Sa"];

		return days[date];
	}
}