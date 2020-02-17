
import { throwError as observableThrowError, Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { jQueryLikeParamSerializer } from './jQueryLikeParamSerializer';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {
  
  public user: any;

  constructor(@Inject(Injector) public url: string, public http: HttpClient) { }

  getAll(params?: any) {
    const queryString = jQueryLikeParamSerializer(this.removeFalsy(params));

    return this.http.get<any>(this.url + '?' + queryString).pipe(catchError(this.handleError));
  }

  getAllDataItems(params?: any) {
    return this.getAll(params).pipe(
      map((r: any) => r.success && r.data && r.data.items ? <Array<any>>r.data.items : [])
    );
  }

  getAllData(params?: any) {
    return this.getAll(params).pipe(
      map((r: any) => r.success && r.data ? r.data : null)
    );
  }

  get(id): Observable<any> {
    return this.http.get<any>(this.url + '/' + id).pipe(catchError(this.handleError));
  }

  create(resource): Observable<any> {
    return this.http.post<any>(this.url, resource).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError));
  }

  update(resource): Observable<any> {
    return this.http.put<any>(this.url + '/' + resource.id, resource).pipe(catchError(this.handleError));
  }

  update_partial(resource): Observable<any> {
    return this.http.patch<any>(this.url + '/' + resource.id, resource).pipe(catchError(this.handleError));
  }

  delete(id?: number, params?: any): Observable<any> {
    const queryParams = this.serialize_delete(params);
    const idParams = id ? '/' + id : '';
    return this.http.delete<any>(this.url + idParams + queryParams).pipe(catchError(this.handleError));
  }

  public handleError(error: Response) {
    return observableThrowError(error);
  }

  setEndpoint(point: string) {
    this.url = environment.api_url + point;

    return this;
  }

  serializeToString(obj: any): String {
    return jQueryLikeParamSerializer(this.removeFalsy(obj));
  }

  serialize(obj: any) {
    const params: URLSearchParams = new URLSearchParams();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (obj[key]) {
          params.set(key, element);
        }
      }
    }

    return params;
  }

  serialize_delete(obj: any) {
    let params = '';

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (obj[key]) {
          params += '/' + key + '/' + encodeURIComponent(element);
        }
      }
    }

    return params;
  }

  removeFalsy = (obj) => {
    const newObj = {};
    if (obj) {
      Object.keys(obj).forEach((prop) => {
        if (obj[prop]) { newObj[prop] = obj[prop]; }
      });
    }
    return newObj;
  }
}
