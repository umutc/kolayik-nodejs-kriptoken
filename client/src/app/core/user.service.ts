
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Resolve } from '@angular/router';

@Injectable()
export class UserService extends DataService {

  constructor(http: HttpClient) {
    super(environment.api_url + 'users/current/user', http);
  }

}

@Injectable({ providedIn: 'root' })
export class UserSelfResolver implements Resolve<any> {
  constructor(private _: UserService) { }

  resolve(): Observable<any> | Promise<any> | any {
    return this
      ._
      .setEndpoint('users/current/user')
      .getAll()
      .pipe(take(1));
  }
}

@Injectable({ providedIn: 'root' })
export class UserSelfCurrencyListResolver implements Resolve<any> {
  constructor(private _: UserService) { }

  resolve(): Observable<any> | Promise<any> | any {
    return this
      ._
      .setEndpoint('users/current/user/currencies/list')
      .getAll()
      .pipe(take(1));
  }
}

@Injectable({ providedIn: 'root' })
export class UserSelfTransectionListResolver implements Resolve<any> {
  constructor(private _: UserService) { }

  resolve(): Observable<any> | Promise<any> | any {
    return this
      ._
      .setEndpoint('users/current/user/transection/list')
      .getAll()
      .pipe(take(1));
  }
}