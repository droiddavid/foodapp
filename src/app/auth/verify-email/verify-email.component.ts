import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

	userData: any;

	constructor(private authService: AuthService) { }

	ngOnInit(): void {
		this.userData = this.authService.userData;
	}

	sendVerificationMail() {
		this.authService.SendVerificationMail();
	}

}