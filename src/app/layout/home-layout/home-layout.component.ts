import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

	isLoggedIn: boolean = false;


	constructor() { }


	ngOnInit(): void {
		let temp:any = localStorage.getItem("isLoggedIn");

		if (temp !== null) {
			//this.isLoggedIn = JSON.parse(this.globals.decode(temp));
		}
	}


	signOut () {	
		this.isLoggedIn = false;
		localStorage.clear();
		// localStorage.setItem(
		// 	"isLoggedIn", 
		// 	this.globals.encode(
		// 		JSON.stringify({"isLoggedIn":this.isLoggedIn})
		// 	)
		// );
	}
}
