import { Component } from '@angular/core';
import { LoginCard } from '../../components/login-card/login-card';

@Component({
  selector: 'app-login-page',
  imports: [LoginCard],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {}
