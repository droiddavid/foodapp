import { DatabaseService } from 'src/app/services/database/database.service';
import { Observable } from "rxjs";
import { FoodItemService } from "./foodItem.service";

export class FoodItem {
	private _id!: number;
	private _userId!: number;
	private _type!: string;
	private _name!: string;
	private _description!: string;
	private _price!: number
	private _image!: string;
	private _status!: number;
	private _lastUpdate!: string;

	private database!: DatabaseService;

	food!: Array<FoodItem>;
	table: string = "food";
	fields: string = "userId";
	localStorageName: string = "foodItems";

	constructor(private foodItemService: FoodItemService) {}

	//Get a single address
	getFoodItem(id:string): Observable<FoodItem> {
		return this.database.getData(this.table, "id", id);
	}

	//Get all food for current user.
	getFoodItems() {
		return this.foodItemService.getFoodItems();
	}

	getFoodItemsFromLocalStorage(): string | null | object {
		return this.foodItemService.getFoodItemsFromLocalStorage();
	}

	//Get the food from the DB.  Return an Observable of type Food.
	getFoodItemsFromDatabase() {
		return this.foodItemService.getFoodItemsFromDatabase()
	}


	public get id() { return this._id; }
	public set id(value: any) {
		this._id = value;
	}

	public get userId() { return this._userId; }
	public set userId(value: any) {
		this._userId = value;
	}

	public get type() { return this._type; }
	public set type(value: any) {
		this._type = value;
	}

	public get name() { return this._name; }
	public set name(value: any) {
		this._name = value;
	}

	public get description() { return this._description; }
	public set description(value: any) {
		this._description = value;
	}

	public get price() { return this._price; }
	public set price(value: any) {
		this._price = value;
	}

	public get image() { return this._image; }
	public set image(value: any) {
		this._image = value;
	}

	public get status() { return this._status; }
	public set status(value: any) {
		this._status = value;
	}

	public get lastUpdate() { return this._lastUpdate; }
	public set lastUpdate(value: any) {
		this._lastUpdate = value;
	}
}