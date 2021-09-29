import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from './schema/feed';

import { Result } from './schema/result';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Accept': 'application/json, text/plain, */*',
  }),
  'withCredentials': false
};
@Injectable({
  providedIn: 'root'
})
export class HttpClientHelperService {

  constructor(private httpClient: HttpClient) { }

  get<Type>(url : string) : Observable<Result<Type>>{
    return this.httpClient.get<Result<Type>>(url,httpOptions);
  }
  post<Type>(url : string, params : any):Observable<Result<Type>>{
    return this.httpClient.post<Result<Type>>(url,params);
  }
}
