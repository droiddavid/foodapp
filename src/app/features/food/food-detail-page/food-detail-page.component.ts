import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GlobalService } from 'src/app/services/global.service';
import { FoodType } from '../foodType/food-type';
import { FoodTypeService } from '../foodType/food-type.service';


@Component({
	selector: 'app-food-detail-page',
	templateUrl: './food-detail-page.component.html',
	styleUrls: ['./food-detail-page.component.css']
})
export class FoodDetailPageComponent implements OnInit, AfterViewChecked {

	@ViewChild('toastElement') toastElement!: ElementRef;

	user: any;
	foodID!: any;
	FoodItem: any;


	private _description!: string;
	private _id!: any;
	private _image!: string;
	private _name!: string;
	private _type!: FoodType;
	private _price!: any;
	private _status!: string;


	FoodType: any;
	FoodTypeList = Array<FoodType>();



	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private database: DatabaseService,
		private foodTypeService: FoodTypeService
	) { }

	ngOnInit(): any {
		if (GlobalService && GlobalService.User) {
			this.user = GlobalService.User;
		} else {
			return new Error("Cannot find user in local storage.");
		}
		if (this.FoodType === undefined) {
			this.FoodType = new FoodType(this.foodTypeService);
		}
		this._getFoodTypes();
	}

	ngAfterViewChecked(): void {
		if(this.FoodItem == null) {
			this.activatedRoute.params
				.subscribe((params: { [x: string]: any; }) => {
					this.foodID = params['foodItem'];

					let _foodItem = this.database.getData('food', 'id', this.foodID);
					_foodItem.subscribe((response: any) => {

						if (response.data.length > 0) {
							this.FoodItem = response.data[0];

							this._description = this.FoodItem.description;
							this._id = this.FoodItem.id;
							this._image = this.FoodItem.image;
							this._name = this.FoodItem.name;
							this._type = this.FoodItem.type;
							this._price = this.FoodItem.price;
							this._status = this.FoodItem.status;
						}
					}
				);
			})
		}
	}



	_getFoodTypes() {

		let _FoodTypes:any = this.FoodType.getFoodTypesFromLocalStorage();

		if ((_FoodTypes === null) || (_FoodTypes.length === 0)) {
			this.FoodType.getFoodTypesFromDatabase()
				.subscribe((data:any) => {

					if (
						(data.message !== "warning" && data.message !== "No data found.") &&
						(data.data.length > 0)
					) {
						this.FoodTypeList = data.data; 

						if (this._type) {
							let tIndex = this.FoodTypeList.findIndex(x => x.type === this.FoodItem.type);
							debugger;
							if (tIndex > -1) {
								
								this.FoodItem.type = this._type = this.FoodTypeList[tIndex];
							}
						}


						this.updateFoodTypeFields(this.FoodTypeList);
						this.saveFoodTypesToLocalStorage(this.FoodTypeList);
					} else {
						this.router.navigate(['/', 'foodTypes']);
					}
				});
		} else {
			this.updateFoodTypeFields(this.FoodTypeList);
			this.saveFoodTypesToLocalStorage(this.FoodTypeList);
		}
	}

	//Save the food types as a json object to localStorage
	saveFoodTypesToLocalStorage(foodTypeList:any): void {
		let a:any;
		if (foodTypeList.data && foodTypeList.data.length > 0) {
			a = foodTypeList.data[0];
		}


		//Case 1: a = a.FoodTypeList.data[0]
		if (a !== undefined && typeof a === "object") {
			localStorage.setItem(
				"FoodTypeList", 
				GlobalService.encode(JSON.stringify(a))
			);
			return;
		}


		//Case 2: a = "string value"
		if (a !== undefined && typeof a === "string") {
			localStorage.setItem(
				"FoodTypeList", 
				GlobalService.encode(a)
			);
			return;
		}


		//Case 3: a = {}
		localStorage.setItem(
			"FoodTypeList", 
			GlobalService.encode(JSON.stringify(foodTypeList))
		);
	}
	//Allows objects to update private fields.
	public updateFoodTypeFields(foodTypeList: any) {
		let a:any = (foodTypeList.data && foodTypeList.data.length > 0) ? 
		foodTypeList.data[0] : 
		foodTypeList;
	}



	//Save the foodItem as a json object to localStorage
	saveToLocalStorage(foodItem:any) {
		let p:any;
		if (foodItem.data && foodItem.data.length > 0) {
			p = foodItem.data[0];
		}


		//Case 1: p = p.foodItem.data[0]
		if (p !== undefined && typeof p === "object") {
			localStorage.setItem(
				"foodItem", 
				GlobalService.encode(JSON.stringify(p))
			);
			return;
		}


		//Case 2: p = "string value"
		if (p !== undefined && typeof p === "string") {
			localStorage.setItem(
				"foodItem", 
				GlobalService.encode(p)
			);
			return;
		}


		//Case 3: p = {}
		localStorage.setItem(
			"foodItem", 
			GlobalService.encode(JSON.stringify(foodItem))
		);
	}


	getField(key: any): string {
		let _fieldname!:string;
		if (key.indexOf("_") > -1) {
			_fieldname = key.split("_")[1]
		}
		return _fieldname;
	}


	submit(): void {
		this.FoodItem = {
			"id": this._id,
			"name": this._name,
			"type": this._type.type,
			"price": this._price,
			"status": this._status,
			"description": this._description,
			"image": this._image
		};

		
		//Declare and assign variables.
		let table:string = "food";
		let columnsArray:any = this.FoodItem;
		let where:any = { "userId" : this.user.id};
		let requiredColumnsArray:any = Object.keys(columnsArray);

		debugger;
		this.router.navigate(['foodList/', this.FoodItem.type]);
		//Update the foodItem in the database.
		// this.database.updateData(table,columnsArray,where,requiredColumnsArray)
		// 	.subscribe((res)=>{
		// 		GlobalService.showToast(
		// 			res.message, 
		// 			"btn-success",
		// 			this.toastElement.nativeElement.id
		// 		);

		// 		this.router.navigate(['foodList/', this._type]);
		// 	});
	}

	onChange(e: any) {
		this._type = e.target.value;

		let temp = this.FoodTypeList.find(x => x.type === this._type);

		if (temp !== undefined) {
			this._type = temp;
		}

		debugger;
	}




	public get description() { return this._description; }
	public set description(value: any) {
		this._description = value; 
	}

	public get id() { return this._id; }
	public set id(value: any) {
		this._id = value; 
	}

	public get image() { return this._image; }
	public set image(value: any) {
		this._image = value; 
	}

	public get name() { return this._name; }
	public set name(value: any) {
		this._name = value; 
	}

	public get type() { return this._type; }
	public set type(value: any) {
		this._type = value; 
	}

	public get price() { return this._price; }
	public set price(value: any) {
		this._price = value; 
	}

	public get status() { return this._status; }
	public set status(value: any) {
		this._status = value; 
	}
}