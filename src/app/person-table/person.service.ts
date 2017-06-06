import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonServerService {
  constructor(private http: Http) {
  }

  public getPagedData(page: any): Observable<Array<any>> {
    return this.http
      .get(`http://localhost:3000/api/persons`)
      .map(response => response.json() as Array<any>);
  }

}
