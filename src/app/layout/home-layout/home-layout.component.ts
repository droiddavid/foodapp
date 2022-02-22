import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

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
			this.isLoggedIn = JSON.parse(GlobalService.decode(temp));
		}
	}


	signOut () {	
		this.isLoggedIn = false;
		localStorage.clear();
		localStorage.setItem(
			"isLoggedIn", 
			GlobalService.encode(
				JSON.stringify(
					{
						"isLoggedIn" : this.isLoggedIn
					}
				)
			)
		);
	}
}