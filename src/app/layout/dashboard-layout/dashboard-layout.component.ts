import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

	faHome = faHome;

	constructor() { }

	ngOnInit(): void {}

	ngDoCheck(): any {
		let _navbar_header = document.getElementById("navbar");
		let _navbar_footer = document.getElementById("mpkFooter");
		let body = document.getElementsByClassName("body")[0]; //returns div.body from <div class="body"...

		if (_navbar_header!== null) {
		
			/* give the body a base height */
			body.setAttribute("style", "height: 100vh;");

			//I made up those hard coded numbers.
			let newBodyTop = body.clientTop + _navbar_header!.clientHeight + 4;
			let newHeight = body.clientHeight - (newBodyTop + _navbar_footer!.clientHeight) + 9;

			body.setAttribute("style", 
				"position: relative; "
				+ "top: " + newBodyTop + "px; " 
				+ "height: " + newHeight + "px; "
				+ "border: 3px solid red;"
			);
		}
	}
}