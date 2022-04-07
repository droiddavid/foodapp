import { Observable } from "rxjs";
import { HoursService } from "./hours.service";


export class Hour {

	private _id!: number;
	private _userId!: number;
	private _sequenceOrder!: number;
	private _month!: string; 
	private _date!: string; 
	private _day!: string; 
	private _dayName!: string; 
	private _year!: string; 
	private _hourOpen!: string; 
	private _hourClosed!: string; 
	private _displayToPublic!: string;

	hours!: Array<Hour>;

	table: string = "hours";
	fields: string = "userId";
	localStorageName: string = "hours";


	constructor(private hoursService: HoursService) {}


	getHours() {
		return this.hoursService.getHours();
	}
	getHoursFromLocalStorage(): string | null | object {
		return this.hoursService.getHoursFromLocalStorage();
	}
	//Get the address from the DB.  Return an Observable of type Hour.
	getHoursFromDatabase() {
		return this.hoursService.getHoursFromDatabase()
	}


	addSchedule(data:any): Observable<any> {
		return this.hoursService.insert(data);
	}


	removeSchedule(recordToDelete:any) {
		return this.hoursService.delete2( recordToDelete )
	}


	update(table:string, columnsArray: Array<string>, where: string, requiredColumnsArray: Array<string>) {
		return this.hoursService.update(table, columnsArray, where, requiredColumnsArray);
	}


	editCheckbox(schedule: any) {
		console.log("schedule: " + schedule);
		console.table([schedule]);
	} 


	public get id() { return this._id; }
	public set id(value: any) {
		this._id = value;
	}


	public get userId() { return this._userId; }
	public set userId(value: any) {
		this._userId = value;
	}


	public get sequenceOrder() { return this._sequenceOrder; }
	public set sequenceOrder(value: any) {
		this._sequenceOrder = value;
	}


	public get month() { return this._month; }
	public set month(value: any) {
		this._month = value;
	}


	public get date() { return this._date; }
	public set date(value: any) {
		this._date = value;
	}


	public get day() { return this._day; }
	public set day(value: any) {
		this._day = value;
	}


	public get dayName() { return this._dayName; }
	public set dayName(value: any) {
		this._dayName = value;
	}


	public get year() { return this._year; }
	public set year(value: any) {
		this._year = value;
	}


	public get hourOpen() { return this._hourOpen; }
	public set hourOpen(value: any) {
		this._hourOpen = value;
	}


	public get hourClosed() { return this._hourClosed; }
	public set hourClosed(value: any) {
		this._hourClosed = value;
	}


	public get displayToPublic() { return this._displayToPublic; }
	public set displayToPublic(value: any) {
		this._displayToPublic = value;
	}
}
