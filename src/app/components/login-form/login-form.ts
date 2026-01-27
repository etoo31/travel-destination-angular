import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  errorMessage = signal('');

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    userType: new FormControl(''),
  });

  handleLogin() {
    const { username, password, userType } = this.loginForm.value;
    if (username && password && userType) {
      this.errorMessage.set(
        `Logging in with\nUsername: ${username}\nPassword: ${password}\nUser Type: ${userType}`,
      );
    } else {
      this.errorMessage.set('Please fill in all fields.');
    }
  }
}
