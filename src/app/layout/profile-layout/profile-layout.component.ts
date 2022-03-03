import { DatabaseService } from './../../services/database/database.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit, AfterViewInit {

	@ViewChild('body') body!: ElementRef;

	user: any;
	Profile: any;

	faChevronLeft = faChevronLeft;

	constructor(private database: DatabaseService) { }

	ngOnInit(): any {
		
		if (!(localStorage.getItem('user'))) {
			return {
				"name": "Error",
				"message": "Cannot find user in local storage."}
		}

		let localStorageUser: string | null = localStorage.getItem('user');

		if (!(this.user) && localStorageUser) {
			this.user = JSON.parse(GlobalService.decode(localStorage.getItem('user')!));
			debugger;
		}
		this.database.getData("profiledata", "userId", this.user.id)
			.subscribe(data => {
				this.Profile = data;
				debugger;
			})
	}

	ngAfterViewInit(): any {
		let _navbar_header = document.getElementById("navbar");
		let _navbar_footer = document.getElementById("mpkFooter");
		//let body = document.getElementsByClassName("body")[0]; //returns div.body from <div class="body"...

		if (_navbar_header!== null) {
		
			/* give the body a base height */
			this.body.nativeElement.style.height = "100vh";

			//I made up those hard coded numbers.
			let newBodyTop = this.body.nativeElement.style.clientTop + _navbar_header!.clientHeight + 4;
			let newHeight = this.body.nativeElement.clientHeight - (newBodyTop + _navbar_footer!.clientHeight) + 9;

			this.body.nativeElement.setAttribute("style", 
				"position: relative; "
				+ "top: " + newBodyTop + "px; " 
				+ "height: " + newHeight + "px; "
				+ "border: 3px solid red;"
			);
		}
	}

}
