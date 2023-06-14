import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  protected static readonly repository_prod = "https://api.talkaboat.online/";
  protected static readonly repository_dev = "https://localhost:7013/";
  protected readonly use_dev_repository = true;
  protected static readonly version = "";
  protected jsonHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', ['*', 'https://localhost:4200', 'https://app.aboat-entertainment.com', 'http://localhost:4200']);

  protected url = RepositoryService.repository_dev + RepositoryService.version;

  constructor(protected readonly http: HttpClient) {
    if (!isDevMode() || !this.use_dev_repository) {
      this.url = RepositoryService.repository_prod + RepositoryService.version;
    }
  }

  public post<T>(api: string, body?: any, header?: HttpHeaders, convert: boolean = true): Observable<T> {
    const requestUrl = this.url + api;
    return this.http.post<T>(requestUrl, convert ? JSON.stringify(body) : body, { 'headers': header ? header : this.jsonHeaders });
  }

  public put<T>(api: string, body?: any, header?: HttpHeaders): Observable<T> {
    const requestUrl = this.url + api;
    return this.http.put<T>(requestUrl, JSON.stringify(body), { 'headers': header ? header : this.jsonHeaders });
  }

  public get<T>(api: string, header?: HttpHeaders, ignoreBase: boolean = false): Observable<any> {
    const requestUrl = ignoreBase ? api : this.url + api;
    return this.http.get<T>(requestUrl, { 'headers': header ? header : this.jsonHeaders });
  }

  public delete(api: string, header?: HttpHeaders): Observable<any> {
    const requestUrl = this.url + api;
    return this.http.delete(requestUrl,  { 'headers': header ? header : this.jsonHeaders });
  }

  public upload(api: string, file: File, body?: any, header?: HttpHeaders): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const requestUrl = this.url + api;
    formData.append('file', file);
    const req = new HttpRequest('POST', requestUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
