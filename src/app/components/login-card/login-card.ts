import { Component } from '@angular/core';
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-login-card',
  imports: [LoginForm],
  templateUrl: './login-card.html',
  styleUrl: './login-card.css',
})
export class LoginCard {}
