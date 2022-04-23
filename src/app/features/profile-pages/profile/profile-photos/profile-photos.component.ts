import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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

	constructor(private router: Router, private database:DatabaseService) { }

	ngOnInit(): void { }

	ngAfterViewInit() {
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
					this.result.nativeElement.innerHTML = '';

					// append new image
					this.result.nativeElement.appendChild(img);
				}
			};
			this.reader.readAsDataURL(event.target.files[0]);
		}
	}

	onSubmit() {
		let base64_image: HTMLImageElement = new Image();
		base64_image.src = this.croppedImage;
		//debugger;
		base64_image.setAttribute("table", "profiledata");
		base64_image.setAttribute("filename", 'profile_' + this.file.name);

		let myImage = new Image(100, 200);
		myImage.src = base64_image.src; //'picture.jpg';
		myImage.style.width = "100%";
		myImage.style.height = "auto";

		let canvas: HTMLCanvasElement = document.createElement("CANVAS") as HTMLCanvasElement;
		let ctx = canvas.getContext("2d");
		if (ctx !== null) {
			ctx.drawImage(myImage, 0, 0);
		} else { return; }

		//Update canvas size to match image
		canvas.width = myImage.naturalWidth;
		canvas.height = myImage.naturalHeight;
		ctx.drawImage(base64_image, 0, 0);		// draw in image
		canvas.toBlob(async (Blob) => {		// get content as JPEG blob
			let tempFile!:any;
			let filename: string | null = base64_image.getAttribute('filename');


			if (Blob !== null && filename !== null) {
				tempFile = new File([Blob], filename, { "type" : "image/png"});
			}

			//Add the file to the formData object.
			let formData = new FormData();
			formData.set("files[]", tempFile);
			let directory: any;
			if (GlobalService.User.directory !== undefined) {
				directory = GlobalService.User.directory;
			}
			formData.set("directory", directory);

			let url = environment.database.baseUrl + environment.database.fileMover;
			this.database.uploadPhotos(url, formData)
				.then(async (r) => {
					if (r.status == 200) {
						GlobalService.showToast(
							"Your image has been uploaded successfully.",
							"btn-success",
							this.toastElement.nativeElement.id
						);
						await this.waitForTimer();
						this.router.navigate(['profile']);
					}
				});
		}, "image/png", 0.6);

		myImage.crossOrigin = "";              // if from different origin
		myImage.src = base64_image.src;
	}

	waitForTimer() {
		setTimeout(()=>{}, 3000);
	};

	//Convert image to base64
	imageCropped(event: ImageCroppedEvent) {
	    this.croppedImage = event.base64;
	}

	imageLoaded() {}

	cropperReady() {}

	loadImageFailed() {}
}