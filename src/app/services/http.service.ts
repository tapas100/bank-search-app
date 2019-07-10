import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public baseUrl: string;

  constructor(
    public http: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
  }
  addHeaders() {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return headers;
  }

  get(resource: string, queryStringObject = {}): Observable<any> {
    const headers = this.addHeaders();
    let url = this.baseUrl + resource
    return this.http.get(url,
      {
        headers: headers
      });
  }
}
