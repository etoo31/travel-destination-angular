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
        response.body.userName,
        response.body.userId,
        response.body.role,
        response.headers.get('authorization') || '',
      );
      return response; // <-- this is the actual data from the server
    } catch (error: any | HttpErrorResponse) {
      console.error('Login failed:', error);
      return null;
    }
  }

  saveCurrentUser(username: string, userId: number, role: string, token: string): void {
    const user = { username: username, userId: userId, role: role, token: token };
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return;
    } else this.router.navigate(['/user-dashboard']);
  }

  getCurrentUser(): { username: string; userId: number; role: string; token: string } | null {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    if (user?.role === 'admin') return true;
    else if (user?.role === 'user') {
      this.router.navigate(['/user-dashboard']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isUser(): boolean {
    const user = this.getCurrentUser();
    if (user?.role === 'user') return true;
    else if (user?.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }

  checkLogin(): void {
    const user = this.getCurrentUser();
    console.log(user);
    if (user && user.token && user.username && user.role && user.userId) return;
    this.logout();
  }
  isAnonymous() {
    const user = this.getCurrentUser();
    if (!user) return true;
    if (user?.role === 'user') {
      this.router.navigate(['/user-dashboard']);
    } else if (user?.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return false;
    }
    return false;
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
