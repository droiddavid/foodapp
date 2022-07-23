import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-food-detail-page',
	templateUrl: './food-detail-page.component.html',
	styleUrls: ['./food-detail-page.component.css']
})
export class FoodDetailPageComponent implements OnInit {

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }

  ngOnInit(): void {
	  debugger;
	  this.activatedRoute.params.subscribe(params => {
		  console.log("params: " + params);
		  console.table([params]);
		  console.log("params.type: " + params['type']);
	  })
  }

}
