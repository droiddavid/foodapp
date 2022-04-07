import { Observable } from 'rxjs';
import { PhoneNumberService } from './phoneNumbers.service';


export class PhoneNumber {

	private _id!:number;
	private _userId!:string;
	private _phoneNumber!:string;
	private _phoneNumberType!:string;
	private _displayToPublic!:string;

	phoneNumbers!: Array<PhoneNumber>;

	table: string = "phoneNumbers";
	fields: string = "userId";
	localStorageName: string = "phoneNumbers";


	constructor(private phoneNumberService: PhoneNumberService) {}


	getPhoneNumbers() {
		return this.phoneNumberService.getPhoneNumbers();
	}
	getPhoneNumbersFromLocalStorage(): string | null | object {
		return this.phoneNumberService.getPhoneNumbersFromLocalStorage();
	}
	//Get the PhoneNumber from the DB.  Return an Observable of type PhoneNumber.
	getPhoneNumbersFromDatabase() {
		return this.phoneNumberService.getPhoneNumbersFromDatabase()
	}


	insert(data:any): Observable<any> {
		return this.phoneNumberService.insert(data);
	}


	public get id() { return this._id; }
	public set id(value: any) {
		this._id = value;
	}

	public get userId() { return this._userId; }
	public set userId(value: any) {
		this._userId = value;
	}

	public get phoneNumber() { return this._phoneNumber; }
	public set phoneNumber(value: any) {
		this._phoneNumber = value;
	}

	public get phoneNumberType() { return this._phoneNumberType; }
	public set phoneNumberType(value: any) {
		this._phoneNumberType = value;
	}

	public get displayToPublic() { return this._displayToPublic; }
	public set displayToPublic(value: any) {
		this._displayToPublic = value;
	}
}