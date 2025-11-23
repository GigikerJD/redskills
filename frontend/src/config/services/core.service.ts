import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class CoreService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) { }

  getUserID(): string {
    return this.cookieService.get("userID") || '';
  }

  getIsLoggedIn(): boolean {
    return this.cookieService.get("isLogged") === "true";
  }

  isAuthenticated(): boolean {
    return this.getIsLoggedIn() && this.getUserID() != '';
  }

  login(userID: string): void {
    this.cookieService.put("userID", userID);
    this.cookieService.put("isLogged", "true");
  }

  logout(): void {
    this.cookieService.remove("userID");
    this.cookieService.remove("isLogged");
  }
}
