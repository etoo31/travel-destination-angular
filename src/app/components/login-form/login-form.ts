import { AfterViewInit, Component, ElementRef, Inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login-service';
@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements AfterViewInit {
  ngAfterViewInit(): void {
    this.errorMessageElement.nativeElement.style.display = 'none';
  }

  constructor(private loginService: LoginService) {}

  errorMessage = signal('');

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    userType: new FormControl(''),
  });

  @ViewChild('errorMessageElement')
  errorMessageElement!: ElementRef<HTMLInputElement>;

  handleLogin(event: Event) {
    event.preventDefault();

    const { username, password, userType } = this.loginForm.value;
    if (username && password && userType) {
      this.errorMessage.update((prev) => '');
      this.errorMessageElement.nativeElement.style.display = 'none';
      this.loginService.handleLogin(username, password, userType);
      this.errorMessage.update((prev) => 'Please fill in all fields.');
    } else {
      this.errorMessage.update((prev) => 'Please fill in all fields.');
      this.errorMessageElement.nativeElement.style.display = 'block';
    }
  }
}
