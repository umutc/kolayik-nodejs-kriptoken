
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class SharedService extends DataService {

  constructor(http: HttpClient) {
    super(environment.api_url, http);
  }

}