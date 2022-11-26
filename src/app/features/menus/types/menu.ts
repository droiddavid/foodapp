export class Menu {
	
	private _id!: string;
	private _userId!: string;
	private _name!: string;
	private _description!: string;
	private _status!: string;
	private _lastUpdate!: string;

	constructor() {
		this._id = "";
		this._userId = "";
		this._name = "";
		this._description = "";
		this._status = "";
		this._lastUpdate = "";
	}

	get id(): string { return this._id; }
	set id(value: string) { this._id = value; }

	get userId(): string { return this._userId; }
	set userId(value: string) { this._userId = value; }

	get name(): string { return this._name; }
	set name(value: string) { this._name = value; }

	get description(): string { return this._description; }
	set description(value: string) { this._description = value; }

	get status(): string { return this._status; }
	set status(value: string) { this._status = value; }

	get lastUpdate(): string { return this._lastUpdate; }
	set lastUpdate(value: string) { this._lastUpdate = value; }
}