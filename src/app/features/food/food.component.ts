import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

	Profile:any = {
		"company": "Company Name"
	}

	foodTypes: any;
	toolbar: any;
	addCategoryButton = document.querySelector('#addCategoryButton');


	User = {};
	FoodList = [];
	FoodListWithFirstLetter = [];
	alphabets = [
		'A','B','C','D','E',
		'F','G','H','I','J',
		'K','L','M','N','O',
		'P','Q','R','S','T',
		'U','V','W','X','Y',
		'Z'
	];
	view_alphabetically: any;
	view_categories: any;
	btn_view_categories: any;
	btn_view_alphabetically: any;

  constructor() { }

  ngOnInit(): void {

	/* Alphabetic List */
	this.view_alphabetically = document.querySelector('#view_alphabetically');

	/* Show Alphabet Button */
	this.btn_view_alphabetically = document.querySelector('#btn_view_alphabetically');

	/* Categorize List */
	this.view_categories = document.querySelector('#view_categories');

	/* Show Categorize Button */
	this.btn_view_categories = document.querySelector('#btn_view_categories');

	this.btn_view_alphabetically.style.display = "none";
	this.view_categories.style.display = "none";


	if (localStorage["user"]) {
		let data = JSON.parse(GlobalService.decode(String(localStorage["data"])));
		let _user = JSON.parse(GlobalService.decode(String(localStorage["user"])));

		let user = (_user.User === undefined) ? _user : _user.User;

		//this.Factories = new UtilityFactory(user);


		// if (!(data.dataRetrieved)) {
		// 	await this.Factories.getData();
		// }


		// for (let key in _user) {
		// 	if (key === "factories") continue;
		// 	this.Factories[key] = _user[key];
		// }

		//await this.Factories.castAll(user);

		//this.User = this.Factories.User;

		//this.User.FoodTypes = this.Factories.FoodTypeFactory;

		//this.Profile = this.Factories.ProfileFactory;

		//this.FoodList = this.Factories.FoodFactory;	
		//this.FoodList.sort((a, b) => (a.name > b.name) ? 1 : -1);

		// localStorage.removeItem("user");
		// localStorage.user = b64EncodeUnicode(String(JSON.stringify(this.Factories)));


		//Fix this!!!
		//this.go("food");
	} else {
		//toastShow('My Personal Kitchen', 'Error: No Profiles Found.');
		return;
	}

	// ToolbarService.init({
	// 	"btnPrevious": {
	// 		"id": 'btnPrevious',
	// 		"class": 'glyphicon glyphicon-chevron-left brand',
	// 		"state": 'cookDashboard',
	// 		"style": 'color: white;'
	// 	},
	// 	"btnBrand": {
	// 		"id": 'btnBrand',
	// 		"class": 'brand pull-right',
	// 		"state": 'food',
	// 		"style": 'color: white;',
	// 		"value": 'Food'
	// 	},
	// 	"menu": [
	// 		{ "name": 'HOME', "state": 'index' },
	// 		{ "name": 'Profile', "state": 'profile' },
	// 		{ "name": 'Memberships', "state": 'memberships' },
	// 		{ "name": 'Upgrade To Cook', "state": 'cookDashboard' },
	// 	]
	// }); //ToolbarService.init(...)


	//this.configureFoodList();


	//Hide the 'Add New FoodType Panel'
	$('#addNewFoodTypePanel').hide();


	// this.addCategoryButton.addEventListener('touchstart click', function () {
	// 	this.addCategoryButton.addEventListener('touchmove', function () {}, true);
	// 	this.addCategoryButton.addEventListener('touchend', function () {
	// 		this.addCategory();
	// 	}, true);
	// }, true);
  }

}
