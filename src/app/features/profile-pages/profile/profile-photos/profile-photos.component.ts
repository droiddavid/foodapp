import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { UserComponent } from 'src/app/components/user/user.component';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile-photos',
  templateUrl: './profile-photos.component.html',
  styleUrls: ['./profile-photos.component.css']
})
export class ProfilePhotosComponent implements OnInit, AfterViewInit {

	@ViewChild('fileInput') fileInput!: ElementRef;
	@ViewChild('result') result!: ElementRef;
	@ViewChild(ImageCropperComponent) imageCropper!: ImageCropperComponent;
	@ViewChild('imagesForm') imagesForm!: ElementRef;
	@ViewChild('toastElement') toastElement!: ElementRef;

	imageChangedEvent: any = '';
	croppedImage: any = '';
	cropper!: ImageCropperComponent;
	file:any;
	reader:any;
	url: string = environment.database.baseUrl + environment.database.fileMover;
	User!: UserComponent;
	profileService!: ProfileService;
	profile!: Profile;

	constructor(private router: Router, private database:DatabaseService) { }

	ngOnInit(): void {
		this.getUser();
		this.profileService = new ProfileService(this.database);
		this._getProfile();
	}


	getUser(): any {
		/** Declare local variables  */
		let _localStorageUser: string | null;

		/* If there is no user, then return new Error */
		if (!localStorage.getItem('user')) {
			return new Error("Cannot find user in local storage.");
		}


		/* Get the user object from localStorage */
		_localStorageUser = localStorage.getItem('user');
		if (!this.User && _localStorageUser) {
			this.User = JSON.parse(GlobalService.decode(localStorage.getItem('user')!));
		}
	}
	_getProfile() {
		let _profile = this.profileService.getProfileFromLocalStorage();
		this.profile = JSON.parse(JSON.stringify(_profile));

		if (this.profile !== null) {
			if (typeof this.profile === "object") {
				<Profile><unknown>this.profile;
			}
		}

		if (this.profile === null) {
			this.profileService.getProfileFromDatabase()
				.subscribe((r) => {
					if (r.message === "No data found.") {
						this.router.navigate(['/', 'profile', 'profileAdd']);
					} else {
						this.updateFields(r);
						this.saveToLocalStorage(r);}});
		} else {
			this.updateFields(this.profile);
			this.saveToLocalStorage(this.profile);}
	}


	//Save the profile as a json object to localStorage
	saveToLocalStorage(profile:any) {
	
		let p:any;
		if (profile.data && profile.data.length > 0) {
			p = profile.data[0];
		}


		//Case 1: p = p.profile.data[0]
		if (p !== undefined && (typeof p === "object")) {
			localStorage.setItem(
				"profile", 
				GlobalService.encode(JSON.stringify(p))
			);
			return;
		}


		//Case 2: p = "string value"
		if (p !== undefined && typeof p === "string") {
			localStorage.setItem(
				"profile", 
				GlobalService.encode(p)
			);
			return;
		}


		//Case 3: p = {}
		localStorage.setItem(
			"profile", 
			GlobalService.encode(JSON.stringify(profile))
		);
	}


	//Allows objects to update private fields.
	public updateFields(profile: any) {
		let p:any = (profile.data && profile.data.length > 0) ? 
			profile.data[0] : 
			profile;

		let _profile: Profile = p;
		this.profile = _profile;	
	}


	ngAfterViewInit() {
		let _directory: string =  'https://www.mypersonalkitchen.com/images/'  + this.User.directory;
		this.result.nativeElement.src = _directory + "/" + this.profile.image;
	}

	fileChangeEvent(event: any): void {
		this.imageChangedEvent = event;

		if (event.target.files.length) {
			this.file = event.currentTarget.files[0];

			this.reader = new FileReader();
			this.reader.onload = (e:any)=> {
				if (e.target.result){

					// create new image
					let img = document.createElement('img');
					img.id = 'image';
					img.src = e.target.result;

					this.result.nativeElement.style.display = 'block';

					// clean result before
					//this.result.nativeElement.innerHTML = '';

					// append new image
					this.result.nativeElement.appendChild(img);
				}
			};
			this.reader.readAsDataURL(event.target.files[0]);
		}
	}

	getBase64Image() {
		let b64Img: HTMLImageElement = new Image();
		b64Img.src = this.croppedImage;
		b64Img.setAttribute("table", "profiledata");

		if (!this.file) {
			GlobalService.showToast(
				"Error: File Not Found.",
				"btn-danger",
				this.toastElement.nativeElement.id
			);
		} else {
			b64Img.setAttribute("filename", 'profile_' + this.file.name);
		}
		return b64Img;
	}
	getNewImage(b64: HTMLImageElement) {
		let myImage = new Image(100, 200);
		myImage.src = b64.src; //'picture.jpg';
		myImage.style.width = "100%";
		myImage.style.height = "auto";
		return myImage;		
	}
	getFormData(_tmpFileName: File) {
		//Add the file to the formData object.
		let _formData = new FormData();
		_formData.set("files[]", _tmpFileName);
		let directory: any;
		if (GlobalService.User.directory !== undefined) {
			directory = GlobalService.User.directory;
		}
		_formData.set("directory", directory);
		return _formData;
	}
	updateProfileImageValue() {
		if (this.file) {
			let profile = {
				userId: String(GlobalService.User.id),
				image: "profile_" + this.file.name		
			};

			//Declare and assign variables.
			let table:string = "profiledata";
			let columnsArray:any = profile;
			let where:any = { "userId" : String(GlobalService.User.id)};
			let requiredColumnsArray:any = Object.keys(columnsArray);

			this.database.updateData(table, columnsArray, where, requiredColumnsArray)
				.subscribe((r) => {
					if (r.message && r.status) {
						//This keeps timing out and producing an error.
						//Come back to this later.
						//04.27.22 12:48AM
						// GlobalService.showToast(
						// 	"Message: " + r.message + ". Status: " + r.status + ".",
						// 	"btn-success", 
						// 	this.toastElement.nativeElement.id
						// );
					}
					this.router.navigate(['/', 'profile', 'profilePhotos']);
				});
		} else {
			//Throw File Not Found Error.
			return;
		}
	}
	onSubmit() {
		let base64_image: HTMLImageElement = this.getBase64Image();
		let myImage = this.getNewImage(base64_image);
		let canvas: HTMLCanvasElement = document.createElement("CANVAS") as HTMLCanvasElement;
		canvas.width = myImage.naturalWidth;
		canvas.height = myImage.naturalHeight;

		let ctx = canvas.getContext("2d");
		if (ctx !== null) { ctx.drawImage(myImage, 0, 0); } else { return; }

		ctx.drawImage(base64_image, 0, 0);		// draw in image
		canvas.toBlob(async (Blob) => {		// get content as JPEG blob
			let tempFile!:any;
			let filename: string | null = base64_image.getAttribute('filename');

			if (
				Blob !== null && 
				(
					filename !== null && 
					filename !== undefined
				)
			) {
				tempFile = new File([Blob], filename, { "type" : "image/png"});

				//Add the file to the formData object.
				let formData = this.getFormData(tempFile);

				this.database.uploadPhotos(this.url, formData)
					.then(async (r) => {
						if (r.status == 200) {
							GlobalService.showToast(
								"Your image has been uploaded successfully.",
								"btn-success",
								this.toastElement.nativeElement.id
							);
							window.setTimeout(() => { window.alert('Timeout.'); }, 3000);
							this.router.navigate(['profile']);
						}
					});
			}
		}, "image/png", 0.6);

		this.updateProfileImageValue();
	}

	//Convert image to base64
	imageCropped(event: ImageCroppedEvent) {
	    this.croppedImage = event.base64;
	}

	imageLoaded() {}

	cropperReady() {}

	loadImageFailed() {}
}