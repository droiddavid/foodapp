import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database/database.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private database: DatabaseService) { }

	//Get a user based on email address
	getUser(email:string): Observable<any> {
		return this.database.getData("users", "emailAddress", email);
	}
}
