import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Injectable()
export class DataAccessService {

  constructor(private http: Http) { }
  public data;
  titles_url = 'http://fourshiabooks.com/server/get_title.php?';
  content_url = 'http://fourshiabooks.com/server/get_content.php?';
  title_content_url = 'http://fourshiabooks.com/server/get_title_content_id.php?';
  contact_url = 'http://fourshiabooks.com/server/sendEmail.php?';
  email_url = 'http://fourshiabooks.com/server/send_email.php';
  
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
  
    private extractData(res: Response) {
		
	let body = res.json();
	console.log(body)
        return body.data || {};
    }  
	
	private handleErrorPromise (error: Response | any) {
		console.error(error.message || error);
		return Promise.reject(error.message || error);
    }
	
	sendEmail(model, handleData) : void {
		$.ajax(
		{
			type: 'POST',
			url: this.email_url,
			data: model,
			success: function(data)
			{
				handleData(data);
			}
		});
	}
}
