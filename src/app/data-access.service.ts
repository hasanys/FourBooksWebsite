import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataAccessService {

  constructor(private http: Http) { }
  public data;
  titles_url = 'http://fourshiabooks.com/server/get_title.php?';
  content_url = 'http://fourshiabooks.com/server/get_content.php?';
  title_content_url = 'http://fourshiabooks.com/server/get_title_content_id.php?';
  
  getAlKafiChapterNames(part) : Promise<Array<any>> { 
	return this.http.get(this.titles_url + 'book=al-kafi&part=' + part)
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }
  
  getAlKafiContent(id, chapter, hadith, number) : Promise<Array<any>> { 
	return this.http.get(this.content_url + 'book=al-kafi&id=' + id)
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }

  getAlKafiContentName(id) : Promise<Array<any>> { 
	return this.http.get(this.title_content_url + 'id=' + id)
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }
}
