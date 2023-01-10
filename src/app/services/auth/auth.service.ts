import { Injectable, NgZone } from '@angular/core';
import { User } from 'src/app/types/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GlobalService } from './../global.service';
import { from, of } from 'rxjs';


//import firebase from 'firebase/compat/app';
//import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})


export class AuthService {

	userData: any //Save logged in user data

	constructor(
		public afs: AngularFirestore, //Inject Firestoree auth service
		public afAuth: AngularFireAuth, //Inject Firebase auth service
		public angularFireAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone, //NgZone service to remove outside scope warning
	) {
		/* Saving user data in localstorage when 
		logged in and setting up null when logged out */
		this.afAuth.authState.subscribe((user) => {

			if (user) {
				this.userData = user;

				localStorage.setItem("user", GlobalService.encode(JSON.stringify(this.userData)));
			} else {
				localStorage.setItem('user', 'null');
			}
		}); 
	}

	/* Sign in */
	SignIn(email: string, password: string) {
		return this.angularFireAuth.signInWithEmailAndPassword(String(email), String(password));
	}

	// Sign up with email/password
	async SignUp(email: string, password: string) {
		try {
			const result = await this.afAuth
				.createUserWithEmailAndPassword(email, password);
			/* Call the SendVerificaitonMail() function when new user sign
			up and returns promise */
			this.SendVerificationMail();
		} catch (error) {
			//window.alert(error.message);
		}
	}

	// Sign out
	async SignOut() {
		return this.afAuth.signOut().then(() => {
			localStorage.removeItem('user');
			this.router.navigate(['sign-in']);
		});
	}

	// Send email verfificaiton when new user sign up
	async SendVerificationMail() {
		return this.afAuth.currentUser
			.then((u: any) => u.sendEmailVerification())
			.then(() => {
				this.router.navigate(['verify-email-address']);
			});
	}

	// Reset Forggot password
	async ForgotPassword(passwordResetEmail: string) {
		return this.afAuth
			.sendPasswordResetEmail(passwordResetEmail)
			.then(() => {
				window.alert('Password reset email sent, check your inbox.');
			})
			.catch((error) => {
				window.alert(error);
			});
	}

	// Returns true when user is looged in and email is verified
	get isLoggedIn(): any {

		try {
			let user:any = null;

			let temp:any = localStorage.getItem("user");

			if (temp !== null) {
				user = JSON.parse(GlobalService.decode(temp));
				user.emailVerified = true;
			}

			return user !== null && user.emailVerified !== false ? true : false;
		} catch(Error: any) {
			return Error;
		}

	}
	async GoogleAuth() {
		const result = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
		return of(result);
	}
}
//# sourceMappingURL=./auth.service.ts.generated.js.map