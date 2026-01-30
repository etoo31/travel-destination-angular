import { Component, input } from '@angular/core';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  username = input.required<string>();

  constructor(private loginService: LoginService) {}

  handleLogout() {
    this.loginService.logout();
  }
}
