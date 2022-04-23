import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from 'src/app/services/database/database.service';
import { UserComponent } from 'src/app/components/user/user.component';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from 'src/app/shared/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';


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
	faUser = faUser;
	faHome = faHome;

	//dataservice
	http?: HttpClient;

	db?: DatabaseService;
	isLoggedIn!: boolean;
	userData: any;

	resetPasswordDialogBox:any;


	constructor(
		public authService: AuthService,
		public afAuth: AngularFireAuth,
		public afs: AngularFirestore,
		private formBuilder: FormBuilder,
		private router: Router,
		private database: DatabaseService) {

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
					Validators.minLength(8),
					Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$'),
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



	ngOnInit(): void { };


	ngDoCheck(): void { }


	async signin(email:string, password:string) {
		const result = await this.afAuth.signInWithEmailAndPassword(email, password);

		this.user = result.user;

		this.SetUserData(result.user);
		this.Submit();
	}
	SetUserData(user: any) {

		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`
		);
		const userData: User = {
			uid: user.uid,
			emailAddress: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified,
		};

		return userRef.set(userData, {
			merge: true,
		});
	}

	//Sign In
	async Submit() {
		let user: UserComponent = new UserComponent(this.database);

		user.getUser(this.user.email)
			.subscribe((response)=>{
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


				this.isLoggedIn = true;
				localStorage.setItem("isLoggedIn", GlobalService.encode(JSON.stringify({"isLoggedIn":this.isLoggedIn})));

				this.router.navigate(['/', 'dashboard']);
				return;
			});
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
		this.router.navigate(['/', 'home', 'signup']);
	}
	goToForgotPassword() {
		this.router.navigate(['/', 'home', 'forgot-password']);
	}
}