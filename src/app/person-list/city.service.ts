import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CitiesService {
  constructor(private http: Http) {}
  search(): Observable<{}> {
    return this.http
               .get(`http://localhost:3000/api/cities?name=Miami`)
               .map(response => response.json());
  }
}
