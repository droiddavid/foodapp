import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/types/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HeaderService } from 'src/app/services/subjects/header.service';

//imort the user service
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent implements OnInit {

	@ViewChild('toastElement') toastElement!:ElementRef;

	//HTML Form
	form: FormGroup;
	user: any;

	//FIELDS
	email!: HTMLInputElement;
	password!: HTMLInputElement;
	rememberMe!: HTMLInputElement;
	btnSignIn!: HTMLButtonElement;
	status!: string;
	forgotPassword_resetIt!: string;
	register_link: string | undefined;


	//ICONS
	// faUser = faUser;
	// faHome = faHome;

	//dataservice
	http?: HttpClient;

	isLoggedIn!: boolean;
	userData!: User;

	resetPasswordDialogBox:any;


	constructor(
		public authService: AuthService,
		public afAuth: AngularFireAuth,
		public afs: AngularFirestore,
		private formBuilder: FormBuilder,
		private router: Router,
		private headerService: HeaderService,
		private userService: UserService) {

			if (this.authService.userData) {
				this.userData = this.authService.userData;
			}

			this.form = this.formBuilder.group({
				email: ['', [
					Validators.email,
					Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
					Validators.required
				]],
				password: ['', [
					Validators.maxLength(20),
					Validators.minLength(7),
					//Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$'),
					Validators.required
				]]
			});

			if (this.email) {
				this.email.value = ""; 
			}
			if (this.password) {
				this.password.value = ""; 
			}
	};

	//authService.GoogleAuth()
	async googleLogin() {
		(await this.authService.GoogleAuth()).subscribe((response: any) => {
			if (response && response.user) {
				GlobalService.User = response.user;

				this.userService.getUser(GlobalService.User.email)
					.subscribe((response: any) => {

						if (!response && !response.data) {
							GlobalService.showToast(
								"User not found",
								"btn-danger", 
								this.toastElement.nativeElement.id
							);
							return;
						}
					
						let {
							emailAddress, id, lastLogin, 
							lastUpdate, message, role,status
						} = response.data[0];
		
						let _user: any = {
							"emailAddress": "", "id": "", "lastLogin": "",
							"lastUpdate": "", "message": "", "role": "", "status": ""
						};
						if (emailAddress && id && lastLogin && lastUpdate && message && role && status) {
							_user.emailAddress = emailAddress;
							_user.id = id;
							_user.lastLogin = lastLogin;
							_user.lastUpdate = lastUpdate;
							_user.message = message;
							_user.role = role;
							_user.status = status;
							_user.directory = _user.emailAddress.split('@')[0] + '_' + _user.id;
						}
						
						debugger;
						if (_user) {
							GlobalService.User = JSON.parse(JSON.stringify(_user));

							GlobalService.localset("data", "user: true");
							GlobalService.localset("user", _user);
						} else {
							GlobalService.localset("data", { "user": false });
							GlobalService.localset("user", _user);
						}

						GlobalService.localset("isLoggedIn", "true");

						//emit changes to the header service.
						this.headerService.changeTitle('dashboard');
						this.headerService.changeMenuItems('dashboard');
						this.router.navigate(['/', 'dashboard']);
					});
			}
		});
	}


	ngOnInit(): void { }


	ngDoCheck(): void { }


	async onSubmit(formData: any) {
		const result = await this.afAuth.signInWithEmailAndPassword(
			formData.email.value, formData.password.value
		);

		if(!result.user?.email) {
			return;
		}

		this.userService.getUser(result.user.email).subscribe((response: any) => {

			if (!response && !response.data) {
				GlobalService.showToast(
					"User not found",
					"btn-danger", 
					this.toastElement.nativeElement.id
				);
				return;
			}
			
			let {emailAddress, id, lastLogin, lastUpdate, message, role,status
			} = response.data[0];

			let _user: any = {
				"emailAddress": "", "id": "", "lastLogin": "",
				"lastUpdate": "", "message": "", "role": "", "status": ""
			};
			if (emailAddress && id && lastLogin && lastUpdate && message && role && status) {
				_user.emailAddress = emailAddress;
				_user.id = id;
				_user.lastLogin = lastLogin;
				_user.lastUpdate = lastUpdate;
				_user.message = message;
				_user.role = role;
				_user.status = status;
				_user.directory = _user.emailAddress.split('@')[0] + '_' + _user.id;
			}
				
			if (_user) {
				GlobalService.User = JSON.parse(JSON.stringify(_user));

				localStorage.setItem("data", GlobalService.encode(JSON.stringify({ "user": true })));
				localStorage.setItem("user", GlobalService.encode(JSON.stringify(_user)));
			} else {
				localStorage.setItem("data", GlobalService.encode(JSON.stringify({ "user": false })));
				localStorage.setItem("user", GlobalService.encode(JSON.stringify({ "user": ""})));
			}

			localStorage.setItem("isLoggedIn", GlobalService.encode(JSON.stringify({"isLoggedIn": "true"})));

			//emit changes to the header service.
			this.headerService.changeTitle('dashboard');
			this.headerService.changeMenuItems('dashboard');
			this.router.navigate(['/', 'dashboard']);
		});


		this.user = result.user;

		this.userData = {
			uid: this.user.uid,
			email: this.user.email,
			displayName: this.user.displayName,
			photoURL: this.user.photoURL,
			emailVerified: this.user.emailVerified,
			directory: ""
		};
	}


	signOut() {
		this.authService.SignOut();
	}


	openResetPasswordDialogBox() {
		this.resetPasswordDialogBox = document.getElementById("resetPasswordDialogBox");
		this.resetPasswordDialogBox.style.display="block";
	}


	closePasswordDialogBox() {
		this.resetPasswordDialogBox.style.display="none";
	}


	async sendPasswordReset(email:HTMLInputElement) {;
		this.resetPasswordDialogBox.style.display="none";

		await this.authService.ForgotPassword(email.value)
			.then(()=>{
				GlobalService.showToast(
					"A password reset request has been sent to your email.",
					"btn-success", 
					this.toastElement.nativeElement.id
				);
			})
			.catch((error) => {
				let error_message:string = (error.message == null) ? "Unknown Error" : error.message;
				GlobalService.showToast(
					"An error has occurred: " + error_message,
					"btn-success", 
					this.toastElement.nativeElement.id
				);
			});
	}


	checkLoggedIn() {
		return (this.authService.isLoggedIn) ? true : false;
	}


	goToSignUp() {
		this.router.navigate(['/', 'signup']);
	}


	goToForgotPassword() {
		this.router.navigate(['/', 'forgot-password']);
	}
}