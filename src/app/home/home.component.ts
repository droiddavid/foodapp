import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



	SearchCriteria = {
		"city": undefined,
		"state": undefined,
		"zipCode": undefined,
		"cook": undefined,
		"food": undefined
	};

	constructor() { }

	ngOnInit(): void {
	}
	search(searchType:string) {
		if (searchType === 'zipCode') {
			this.loadCooksByZipCode();
		}
	}
	loadCooksByZipCode () {
		// this.database.getData(
		// 	"vw_cooksByZipCode", 
		// 	"zip",
		// 	this.SearchCriteria.zipCode
		// ) //'19110'
		// 	.subscribe((response)=>{
		// 		if (!response.data) {
		// 			return;
		// 		}
		// 		this.publicCooksData = JSON.parse(JSON.stringify(response.data));

		// 		//if the username or firstname does not exist, then
		// 		//the directory name cannot be created.  The images
		// 		//rely on the user directory.
		// 		for (let i=0; i<this.publicCooksData.length; i++) {
		// 			let cook = this.publicCooksData[i];

		// 			if (
		// 				!(cook.hasOwnProperty("userName")) ||
		// 				!(cook.hasOwnProperty("firstName"))
		// 			) { continue; }

		// 			cook.userName = cook.userName + '_' + cook.userId;
		// 			cook.directory = cook.firstName + '_' + cook.userId;
		// 		}


		// 		//this.processing();


		// 		if (this.cooks) {
		
		// 			this.parseCookTags();
		
		// 			for (let i=0; i<this.cooks.length; i++) {
		// 				let cook = this.cooks[i];
		// 				//debugger;
		// 				if ( cook.hasOwnProperty("profile_image") ) {
		// 					if ( cook.profile_image.length > 0 ) {
		// 						let _directory = 'images/' + cook.directory;
		// 						let _filename = cook.profile_image;
			
		// 						let image = new Image();
		// 						image.src = _directory + '/' + _filename;
		// 						cook.imageSource = _directory + '/' + _filename;
			
		// 					}
		// 				} else {
		// 					cook.imageSource = "images/png/profile_standard.png";
		// 				}
		// 			} //for each cook
		// 		}
		// 	});
	};
	cooks!: Array<any>;
	emailData!:Array<any>;
	hoursData!:Array<any>;
	phoneNumberData!:Array<any>;
	// processing():any {
	// 	debugger;
	// 	this.cooks = this.globals.selectDistinct(this.publicCooksData, "userId");
	// 	this.emailData = this.globals.selectDistinct(this.publicCooksData, "emails_email");
	// 	this.hoursData = this.globals.selectDistinct(this.publicCooksData, "hours_date");
	// 	this.phoneNumberData = this.globals.selectDistinct(this.publicCooksData, "phoneNumber");
	// 	this.cooks.forEach( (cook:any) => {
	// 		cook.emails = [];
	// 		cook.hours = [];
	// 		cook.phoneNumbers = [];
	// 		this.emailData.forEach(function (email:any) {
	// 			if (cook.userId === email.userId) {
	// 				if (email.emails_email !== undefined) {
	// 					cook.emails.push({
	// 						"email": email.emails_email,
	// 						"emailtype": email.emails_emailType
	// 					});	
	// 				}
	// 			}
	// 		});
	// 		delete cook.emails_email;
	// 		delete cook.emails_emailType;


	// 		this.hoursData.forEach( (hour:any) => {
	// 			if (cook.userId === hour.userId) {
	// 				if (hour.hours_date !== undefined) {
	// 					cook.hours.push({
	// 						"hours_sequenceOrder": hour.hours_sequenceOrder,
	// 						"hours_month": hour.hours_month,
	// 						"hours_date": hour.hours_date,
	// 						"hours_day": hour.hours_day,
	// 						"hours_dayName": hour.hours_dayName,
	// 						"hours_year": hour.hours_year,
	// 						"hours_hourOpen": hour.hours_hourOpen,
	// 						"hours_Closed": hour.hours_Closed
	// 					});
	// 				}
	// 			}
	// 		});
	// 		delete cook.hours_sequenceOrder;
	// 		delete cook.hours_month;
	// 		delete cook.hours_date;
	// 		delete cook.hours_day;
	// 		delete cook.hours_dayName;
	// 		delete cook.hours_year;
	// 		delete cook.hours_hourOpen;
	// 		delete cook.hours_Closed;


	// 		this.phoneNumberData.forEach( (phoneNumber:any) => {
	// 			if (cook.userId === phoneNumber.userId) {
	// 				if (phoneNumber.phoneNumber !== undefined) {
	// 					cook.phoneNumbers.push({
	// 						"phoneNumber": phoneNumber.phoneNumber,
	// 						"phoneNumberType": phoneNumber.phoneNumberType
	// 					});	
	// 				}
	// 			}
	// 		});
	// 		delete cook.phoneNumber;
	// 		delete cook.phoneNumberType;
	// 	});
	// }
	parseCookTags() {
		/* Parse each cook's tags array and get each cooks image file */
		for (let i=0; i<this.cooks.length; i++) {
			let tags:any;
			if (tags) { //tags json string array to array
				tags = this.convertToArray(tags);					
			}
		} //for each cook
		debugger;	
	}
	convertToArray ( jsonString:string ) {
		let temp = undefined;

		//addresses json string array to array
		if ((jsonString.indexOf("{") >= 0) && (jsonString.indexOf("}") >= 0)) {
			temp = JSON.parse(jsonString);
			jsonString = temp;
		}

		return jsonString;
	};

}
