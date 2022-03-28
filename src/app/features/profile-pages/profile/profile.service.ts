import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { Profile } from './profile';


@Injectable({	
	providedIn: 'root'
})


export class ProfileService {

	table:string = "profiledata";
	fields:string = "userId";
	localStorageName = "profile";


	constructor(private database: DatabaseService) { }

	//Create
	addProfile() {}


	//Get the profile from the DB.  Return an Observable of type Profile.
	getProfileFromDatabase(): Observable<Profile> {
		return this.database.getData(
			this.table, 
			this.fields, 
			GlobalService.User.id
		);
	}


	//Get the profile from LocalStorage.  Return a string.
	getProfileFromLocalStorage(): string | null {
		let _profile = localStorage.getItem(this.localStorageName);

		if (_profile === null) {
			return null;
		}
		return JSON.parse(GlobalService.decode(_profile!));
	}


	//Update
	update() {}

}