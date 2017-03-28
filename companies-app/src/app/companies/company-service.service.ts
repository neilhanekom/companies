import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable } from 'rxjs/Observable';


import { Company } from './company.model';

@Injectable()
export class CompanyServiceService {


  constructor(private http: Http ) { }

  private apiUrl: string = "http://localhost:4567/api/v1/companies";

  getCompanies(): Observable<Company[]> {
    return this.http.get(this.apiUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get(this.apiUrl + '/' + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addCompany (body: Object): Observable<Company[]> {

        let bodyString = JSON.stringify(body);
        
        let headers      = new Headers({ 'Content-Type': 'application/json' }); 
        let options       = new RequestOptions({ headers: headers });

        return this.http.post(this.apiUrl, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }   

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
