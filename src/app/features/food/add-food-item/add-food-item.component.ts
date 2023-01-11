import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FoodItemService } from '../foodItem/foodItem.service';

@Component({
	selector: 'app-add-food-item',
	templateUrl: './add-food-item.component.html',
	styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {
	form!: FormGroup;
	private file!: File;

	constructor(private foodItemService: FoodItemService) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			'type': new FormControl(null, Validators.required),
			'name': new FormControl(null, Validators.required),
			'description': new FormControl(null, Validators.required),
			'price': new FormControl(null, Validators.required),'image': new FormControl(null, Validators.required),
		});
	}
	onSubmit(_formData: any) {
		if (this.form.valid) {
		    const foodItem = {
			   type: this.form.value.type,
			   name: this.form.value.name,
			   description: this.form.value.description,
			   price: this.form.value.price,
			   image: this.file
		    };


		    
		    // use this code after you finish the service
		//     this.foodItemService.addFoodItem(foodItem)
		// 	   .subscribe(
		// 		  () => {
		// 			 this.form.reset();
		// 			 // Show success notification
		// 		  },
		// 		   (error: any) => {
		// 			 // Show error notification
		// 		  }
		// 	   );
		}
	 }
	 onFileSelected(event: any) {
	    this.file = event.target.files[0];
	 }

	
	 
}
