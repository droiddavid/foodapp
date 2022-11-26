export class Platter {

	private _id!: string;
	private _userId!: string;
	private _menuId!: string;
	private _name!: string;
	private _description!: string;
	private _price!: string;
	private _status!: string;
	private _lastUpdate!: string;
	private _image!: string;
	private _displayAsSpecial!: string;
	private _Food = [];

	constructor() { }

	public get id() { return this._id; }
	public set id(value: any) {
		this._id = value;
	}

	public get userId() { return this._userId; }
	public set userId(value: any) {
		this._userId = value;
	}

	public get menuId() { return this._menuId; }
	public set menuId(value: any) {
		this._menuId = value;
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

	public get status() { return this._status; }
	public set status(value: any) {
		this._status = value;
	}

	public get lastUpdate() { return this._lastUpdate; }
	public set lastUpdate(value: any) {
		this._lastUpdate = value;
	}

	public get image() { return this._image; }
	public set image(value: any) {
		this._image = value;
	}

	public get displayAsSpecial() { return this._displayAsSpecial; }
	public set displayAsSpecial(value: any) {
		this._displayAsSpecial = value;
	}

	public get Food() { return this._Food; }
	public set Food(value: any) {
		this._Food = value;
	}

}