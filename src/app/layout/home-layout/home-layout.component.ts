import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

	isLoggedIn: boolean = false;


	constructor(private globals: GlobalService) { }


	ngOnInit(): void {
		let temp:any = localStorage.getItem("isLoggedIn");

		if (temp !== null) {
			this.isLoggedIn = JSON.parse(this.globals.decode(temp));
		}
	}


	signOut () {	
		this.isLoggedIn = false;
		localStorage.clear();
		localStorage.setItem(
			"isLoggedIn", 
			this.globals.encode(
				JSON.stringify(
					{
						"isLoggedIn" : this.isLoggedIn
					}
				)
			)
		);
	}
}