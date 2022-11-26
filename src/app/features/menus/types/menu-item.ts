export class MenuItem {
	
	private _id!: string;
	private _menuItemId!: string;
	private _userId!: string;
	private _menuId!: string;
	private _platterId!: string;
	private _foodId!: string;
	private _foodStatus!: string;
	private _isDisplay!: string;

	constructor() {
		this._id = "";
		this._menuItemId = "";
		this._userId = "";
		this._menuId = "";
		this._platterId = "";
		this._foodId = "";
		this._foodStatus = "";
		this._isDisplay = "";
	}

	get id(): string { return this._id; }
	set id(value: string) { this._id = value; }

	get menuItemId(): string { return this._menuItemId; }
	set menuItemId(value: string) { this._menuItemId = value; }

	get userId(): string { return this._userId; }
	set userId(value: string) { this._userId = value; }

	get menuId(): string { return this._menuId; }
	set menuId(value: string) { this._menuId = value; }

	get platterId(): string { return this._platterId; }
	set platterId(value: string) { this._platterId = value; }

	get foodId(): string { return this._foodId; }
	set foodId(value: string) { this._foodId = value; }

	get foodStatus(): string { return this._foodStatus; }
	set foodStatus(value: string) { this._foodStatus = value; }

	get isDisplay(): string { return this._isDisplay; }
	set isDisplay(value: string) { this._isDisplay = value; }

}