import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-address-list-item',
  templateUrl: './address-list-item.component.html',
  styleUrls: ['./address-list-item.component.css']
})
export class AddressListItemComponent implements OnInit {

	@Input() address:any;
	@Output() onDelete:any = new EventEmitter<any>();

	constructor() { }

	ngOnInit(): void {
	}

	removeAddress(_address: any) {
		this.onDelete.emit(_address);
	}

}