import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/authenticate';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  async handleLogin(username: string, password: string, userType: string): Promise<any> {
    const payload = { username, password, role: userType };

    try {
      const response: HttpResponse<any> = await firstValueFrom(
        this.http.post<any>(this.apiUrl, payload, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          observe: 'response', // ✅ important to get headers
        }),
      );

      console.log('Response body:', response.body);
      console.log('Authorization header:', response.headers.get('Authorization'));
      this.saveCurrentUser(
        response.body.username,
        response.body.role,
        response.headers.get('Authorization') || '',
      );
      return response; // <-- this is the actual data from the server
    } catch (error: any | HttpErrorResponse) {
      console.error('Login failed:', error);
      return null;
    }
  }

  saveCurrentUser(username: string, role: string, token: string): void {
    const user = { username: username, role: role, token: token };
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return;
    } else this.router.navigate(['/user-dashboard']);
  }

  getCurrentUser(): { username: string; role: string; token: string } | null {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  checkLogin(): void {
    const user = this.getCurrentUser();
    if (user && user.token && user.username && user.role) return;
    this.logout();
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
