import { FoodTypeService } from "./food-type.service";

export class FoodType {

	private _foodTypeId!: number;
	private _userId!: number;
	private _type!: string;
	private _image!: string;
	private _imageUrl!: string;
	private _status!: number;

	foodTypes!: Array<FoodType>;

	table: string = "foodTypes";
	fields: string = "userId";
	localStorageName: string = "foodTypes";


	constructor(private foodTypeService: FoodTypeService) {}


	getFoodTypes() {
		return this.foodTypeService.getFoodTypes();
	}
	getFoodTypesFromLocalStorage(): string | null | object {
		return this.foodTypeService.getFoodTypesFromLocalStorage();
	}
	//Get the FoodType from the DB.  Return an Observable of type FoodType.
	getFoodTypesFromDatabase() {
		return this.foodTypeService.getFoodTypesFromDatabase()
	}


	public get foodTypeId() { return this._foodTypeId; }
	public set foodTypeId(value: any) {
		this._foodTypeId = value;
	}

	public get userId() { return this._userId; }
	public set userId(value: any) {
		this._userId = value;
	}

	public get type() { return this._type; }
	public set type(value: any) {
		this._type = value;
	}

	public get image() { return this._image; }
	public set image(value: any) {
		this._image = value;
	}

	public get imageUrl() { return this._imageUrl; }
	public set imageUrl(value: any) {
		this._imageUrl = value;
	}

	public get status() { return this._status; }
	public set status(value: any) {
		this._status = value;
	}
}