import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoutesInterceptor implements CanActivate {

constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
        return true;
    }
    this.router.navigate(['/login/login']);
    return false;
  }
}
