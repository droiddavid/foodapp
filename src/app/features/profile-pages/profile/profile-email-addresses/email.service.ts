import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

	table:string = "emails";
	fields:string = "userId";
	localStorageName = "emails";

	constructor(private database: DatabaseService) { }


	//Get a single address
	getEmail(id:string): Observable<Email> {
		return this.database.getData(this.table, "id", id);
	}


	//Get all emails for a specific user
	getEmails(): Observable<Email[]> {
		return this.database.getData(this.table, "userId", GlobalService.User.id);
	}


	//Get the emails from the DB.  Return an Observable of type Email.
	getEmailsFromDatabase(): Observable<Email> {
		return this.database.getData(
			this.table, 
			this.fields, 
			GlobalService.User.id
		);
	}


	//Get the email from LocalStorage.  Return a string.
	getEmailsFromLocalStorage(): string | null | object {
		let _emails = localStorage.getItem(this.localStorageName);

		if (_emails === null) {
			return null;
		}
		return JSON.parse(GlobalService.decode(_emails!));
	}
}
