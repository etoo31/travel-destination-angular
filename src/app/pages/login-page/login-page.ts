import { Component, inject, OnInit } from '@angular/core';
import { LoginCard } from '../../components/login-card/login-card';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login-page',
  imports: [LoginCard],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  loginService = inject(LoginService);
  ngOnInit(): void {
    this.loginService.isAnonymous();
  }
}
