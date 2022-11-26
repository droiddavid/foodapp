export class PlatterItem {

	private _platterItemId!: string;
	private _userId!: string;
	private _platterId!: string;
	private _foodId!: string;

	constructor() { }

	public get platterItemId() { return this._platterItemId; }
	public set platterItemId(value: any) {
		this._platterItemId = value;
	}

	public get userId() { return this._userId; }
	public set userId(value: any) {
		this._userId = value;
	}

	public get platterId() { return this._platterId; }
	public set platterId(value: any) {
		this._platterId = value;
	}

	public get foodId() { return this._foodId; }
	public set foodId(value: any) {
		this._foodId = value;
	}
}