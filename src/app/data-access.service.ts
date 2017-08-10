import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataAccessService {

  constructor(private http: Http) { }
  public data;
  url = 'http://localhost:8080/testserver/index.php';
  
  myData() : Promise<Array<any>> { 
	
	return this.http.get(this.url)
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }
  
}
