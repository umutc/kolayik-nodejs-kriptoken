import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { LogoutService } from './logout.service';

@Injectable()
export class AuthService {
  private token: any;
  public tokenChange = new Subject();

  constructor(
    private router: Router,
    private _logout: LogoutService) {
    this.token = localStorage.getItem('token');
    this.tokenChange.subscribe(token => this.token = token);
  }

  public isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  public authenticate(token: string) {
    localStorage.setItem('token', token);
    this.router.navigateByUrl('/');
    this.tokenChange.next(token);
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }

  public getToken(): string | null {
    return String(this.token);
  }

  public unauthenticate() {
    this
      ._logout
      .create(null)
      .subscribe(() => {
        localStorage.removeItem('token');
        this.tokenChange.next(null);
        this.router.navigateByUrl('/login/login');
        setTimeout(() => {
          window.location.reload();
        }, 0);
      });
  }

}
