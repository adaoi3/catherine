import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenDto } from "../interfaces/token.dto";
import { AppSettings } from "../global-constants/app.settings";
import { TokenJsonPayload } from "../interfaces/token-json-payload";
import { ROLE } from "../interfaces/role.constants";
import { RolesForPermission } from "../interfaces/roles-for-permission";
import { AuthenticationDto } from "../interfaces/authentication.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(authenticationDto: AuthenticationDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(AppSettings.API_ENDPOINT + '/token', authenticationDto);
  }

  parseJwt(token: string): TokenJsonPayload {
    let base64Url = token.split('.')[1] || '';
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return jsonPayload? JSON.parse(jsonPayload) : {};
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isUser(): boolean {
    let token = localStorage.getItem('token') || '';
    let parsedToken = this.parseJwt(token);
    let roles: string[] = parsedToken.roles || [];
    return !!roles.find(role => role === ROLE.USER)
  }

  isAdmin(): boolean {
    let token = localStorage.getItem('token') || '';
    let parsedToken = this.parseJwt(token);
    let roles: string[] = parsedToken.roles || [];
    return !!roles.find(role => role === ROLE.ADMIN)
  }

  getCurrentUserId(): string {
    let id = '';
    let token = localStorage.getItem('token');
    if (token) {
      id = this.parseJwt(token).id;
    }
    return id;
  }

  checkEnoughPermissions(rolesForPermission: RolesForPermission): boolean {
    let token = localStorage.getItem('token') || '';
    let parsedToken = this.parseJwt(token);
    let roles: string[] = parsedToken.roles || [];
    for (const userRole of roles) {
      for (const allowedRole of rolesForPermission.allowedRoles) {
        if (userRole === allowedRole) {
          return true;
        }
      }
    }
    return false;
  }

}
