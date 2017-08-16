import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataAccessService {

  constructor(private http: Http) { }
  public data;
  titles_url = 'http://localhost:8080/testserver/get_title.php?';
  url = 'http://localhost:8080/testserver/get_title.php?';

  myData() : Promise<Array<any>> { 
	
	return this.http.get(this.url)
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }
  
  getAlKafiChapterNamesPart1() : Promise<Array<any>> { 
	return this.http.get(this.titles_url + 'book=al-kafi&part=1')
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }
  
  getAlKafiChapterNamesPart2() : Promise<Array<any>> { 
	return this.http.get(this.titles_url + 'book=al-kafi&part=2')
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }  
  
  getAlKafiDescription() : Promise<Array<any>> { 
	return this.http.get(this.titles_url + 'book=al-kafi&part=-1')
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }
}
