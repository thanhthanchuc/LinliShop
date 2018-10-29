import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppUser } from './models/app-user';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
      return this.auth.appUser$.pipe(map((appUser: AppUser) => appUser.isAdmin))
  }
}
