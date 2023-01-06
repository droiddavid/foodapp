import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Email } from 'src/app/features/profile-pages/profile/profile-email-addresses/email';
import { EmailService } from 'src/app/features/profile-pages/profile/profile-email-addresses/email.service';
import { GlobalService } from 'src/app/services/global.service';
//import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
	selector: 'app-email-list-item',
	templateUrl: './email-list-item.component.html',
	styleUrls: ['./email-list-item.component.css']
})
export class EmailListItemComponent implements OnInit {

	@ViewChild('toastElement') toastElement!:ElementRef;
	@Input() email:any;
	@Input() emailType:any;

	@Output() onDelete:any = new EventEmitter<any>();

	//faTimes = faTimes;

	constructor(private emailService: EmailService) { }

	ngOnInit(): void {
	}
	
	removeEmail(e: Email) {
		this.onDelete.emit(e);
	}

	//Save the email as a json object to localStorage
	saveToLocalStorage(email:any): void {
	
		let e:any;
		if (email.data && email.data.length > 0) {
			e = email.data[0];
		}


		//Case 1: e = e.email.data[0]
		if (e !== undefined && typeof e === "object") {
			localStorage.setItem(
				"emails", 
				GlobalService.encode(JSON.stringify(e))
			);
			return;
		}


		//Case 2: e = "string value"
		if (e !== undefined && typeof e === "string") {
			localStorage.setItem(
				"emails", 
				GlobalService.encode(e)
			);
			return;
		}


		//Case 3: e = {}
		localStorage.setItem(
			"emails", 
			GlobalService.encode(JSON.stringify(email))
		);
	}
}
