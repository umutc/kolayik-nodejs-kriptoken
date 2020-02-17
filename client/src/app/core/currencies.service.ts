
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Resolve } from '@angular/router';

@Injectable()
export class CurrenciesService extends DataService {

  constructor(http: HttpClient) {
    super(environment.api_url + 'currencies/list', http);
  }

}

@Injectable({ providedIn: 'root' })
export class CurrencyListResolver implements Resolve<any> {
  constructor(private _: CurrenciesService) { }

  resolve(): Observable<any> | Promise<any> | any {
    return this
      ._
      .getAll()
      .pipe(take(1));
  }
}