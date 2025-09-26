import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedInUser, LoginToken, User } from '../../types/user.type';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isAuthenticated = signal<boolean>(false);
  private _loggedInUserInfo = signal<LoggedInUser>({} as LoggedInUser);
  private autoLogoutTimer: any;
  private _authToken = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  isAuthenticated = this._isAuthenticated.asReadonly();
  loggedInUserInfo = this._loggedInUserInfo.asReadonly();
  authToken = this._authToken.asReadonly();

  get isUserAuthenticated$(): Observable<boolean> {
    return toObservable(this.isAuthenticated);
  }
  get loggedInUser$(): Observable<LoggedInUser> {
    return toObservable(this.loggedInUserInfo);
  }

  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup';
    return this.http.post(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.http.post(url, { email: email, password: password });
  }

  activateToken(token: LoginToken): void {
    // token.expiresInSeconds = 10;
    localStorage.setItem('token', token.token);
    localStorage.setItem(
      'expiry',
      new Date(Date.now() + token.expiresInSeconds * 1000).toISOString()
    );
    localStorage.setItem('firstName', token.user.firstName);
    localStorage.setItem('lastName', token.user.lastName);
    localStorage.setItem('address', token.user.address);
    localStorage.setItem('city', token.user.city);
    localStorage.setItem('state', token.user.state);
    localStorage.setItem('pin', token.user.pin);
    localStorage.setItem('email', token.user.email); //new

    this._isAuthenticated.set(true);
    this._loggedInUserInfo.set(token.user);
    this.setAutoLogoutTimer(token.expiresInSeconds * 1000);
    this._authToken.set(token.token); //new
  }

  logout(): void {
    localStorage.clear();
    this._isAuthenticated.set(false);
    this._loggedInUserInfo.set({} as LoggedInUser);
    clearTimeout(this.autoLogoutTimer);
    this._authToken.set(null);
  }

  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  loadToken(): void {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');

    if (!token || !expiry) {
      this._isAuthenticated.set(false); // Ensure initial state is false
      return;
    }

    const expiresIn = new Date(expiry).getTime() - Date.now();
    if (expiresIn > 0) {
      const user: LoggedInUser = {
        firstName: localStorage.getItem('firstName') || '',
        lastName: localStorage.getItem('lastName') || '',
        address: localStorage.getItem('address') || '',
        city: localStorage.getItem('city') || '',
        state: localStorage.getItem('state') || '',
        pin: localStorage.getItem('pin') || '',
        email: localStorage.getItem('email') || '', //new
      };

      this._isAuthenticated.set(true);
      this._loggedInUserInfo.set(user);
      this.setAutoLogoutTimer(expiresIn);
      this._authToken.set(token);
    } else {
      this.logout();
    }
  }
}
