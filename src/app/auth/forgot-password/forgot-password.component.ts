import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

	constructor(private authService: AuthService) { }

	ngOnInit(): void {}

}
