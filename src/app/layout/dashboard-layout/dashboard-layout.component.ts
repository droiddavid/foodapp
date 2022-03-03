import { Component, ElementRef, OnInit, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit, AfterViewInit {

	@ViewChild('body')
	body!:ElementRef;

	faHome = faHome;

	constructor() { }
	ngAfterViewInit(): void {
		let _header = document.getElementById("navbar");
		let _footer = document.getElementById("mpkFooter");
		let _body = this.body.nativeElement;

		let p = _header !== null;
		let q = _body !== null;
		let k =  _body !== undefined;

		if (p && q && k) {
			/* give the body a base height */
			_body.style.height = "100vh";

			//I made up those hard coded numbers.
			let _top = _body.style.clientTop + _header!.clientHeight;
			let _height = _body.style.clientHeight - (_top + _footer!.clientHeight);

			_body.style.position = "relative";
			_body.style.top = _top + "px";
			_body.style.height = _height + "px";
			_body.style.border = "3px solid red";
		} else {
			throw new Error('Method not implemented.');
		}
	}

	ngOnInit(): void {}

}