import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { ApiResponse } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public baseUrl: string;

  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  private getQueryString(queryObject = {}) {
    if (queryObject = {}) {
      queryObject = this.route.snapshot.queryParamMap;
    }
    var queryString = Object.keys(queryObject)
      .map(function (key) {
        if (queryObject[key]) {
          return key + "=" + queryObject[key];
        } else {
          return "";
        }
      })
      .join("&");
    if (queryString) {
      return "?" + queryString;
    } else {
      return "";
    }
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

  post(resource: string, data: any, queryStringObject = {}): Observable<any> {
    const headers = this.addHeaders();
    // let url = this.baseUrl + resource+ this.getQueryString(queryStringObject);
    let url = this.baseUrl + resource;

    return this.http.post(url, data,
      {
        headers: headers,
      });
  }




  put(resource: string, data: any, queryStringObject = {}): Observable<any> {
    const headers = this.addHeaders();
    let url = this.baseUrl + resource + this.getQueryString(queryStringObject);
    return this.http.put(url, data,
      {
        headers: headers
      });
  }

  delete(resource: string, queryStringObject = {}): Observable<any> {
    const headers = this.addHeaders();
    let url = this.baseUrl + resource + this.getQueryString(queryStringObject);
    return this.http.delete(url,
      {
        headers: headers
      });
  }

  file(resource: string, data: any, queryStringObject = {}, key: string = ''): Observable<ApiResponse> {
    const headers = this.addHeaders();
    let url = this.baseUrl + resource + this.getQueryString(queryStringObject);
    const _formData = new FormData();
    if (key.length > 0) {
      _formData.append(key, data);
    } else {
      _formData.append('files', data);
    }
    return this.http.post(url, _formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map(event => {
      let apiResponse: ApiResponse = new ApiResponse();
      switch (event.type) {

        // handle the upload progress event received
        case HttpEventType.UploadProgress:
          const numberOfBytesUpload = event.loaded;
          const totalNumberOfBytesToUpload = event.total;
          if (numberOfBytesUpload && totalNumberOfBytesToUpload) {
            apiResponse.progress = ((numberOfBytesUpload / totalNumberOfBytesToUpload) * 100);
            apiResponse.isInComplete = true;
          }
          break;

        // handle the download progress event received
        case HttpEventType.DownloadProgress:
          const numberOfBytesDownload = event.loaded;
          const totalNumberOfBytesToDownload = event.total;
          apiResponse.progress = ((numberOfBytesDownload / totalNumberOfBytesToDownload) * 100);
          apiResponse.isInComplete = true;
          break;

        // handle the response event received
        case HttpEventType.Response:
          // When getting the full response body
          apiResponse.data = event.body['data'];
          apiResponse.isInComplete = false;
          break;
      }
      return apiResponse;
    }), finalize(() => {
    }));
  }
}
