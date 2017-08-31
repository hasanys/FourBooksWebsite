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
  hadith_url = 'http://fourshiabooks.com/server/get_hadith.php?';
  search_url = 'http://fourshiabooks.com/server/get_results.php?';
  
  getAlKafiChapterNames(part) : Promise<Array<any>> { 
	return this.http.get(this.titles_url + 'book=al-kafi&part=' + part)
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }
  
  getAlKafiContent(id) : Promise<Array<any>> { 
		return this.http.get(this.content_url + 'book=al-kafi&id=' + id)
					.map((res) => {
						// some manipulation
						return res.json()
					}).toPromise();
  }

  getAlKafiContentName(id) : Promise<Array<any>> { 
	return this.http.get(this.title_content_url + 'id=' + id)
					.map((res) => {
						// some manipulation
						return res.json()
					})
					.toPromise();
  }
  
  getHadith(book, content, chapter, number, hadith) : Promise<Array<any>> {
	  //Book = Al-Kafi
	  //Content = 4 (eg: The book on blah blah blah)
	  //Chapter = 2
	  //Number = 46
	  //OR
	  //Book = Al-Kafi
	  //Hadith = 1046
		if (hadith == -1) {
	  	return this.http.get(this.hadith_url + 'book=' + book + "&content_id=" + content + "&chapter=" + chapter + "&number=" + number)
					.map((res) => {
						// some manipulation
						return res.json()
					}).toPromise();
		}
		else {
	  	return this.http.get(this.hadith_url + 'book=' + book + "&hadith=" + hadith)
					.map((res) => {
						// some manipulation
						return res.json()
					}).toPromise();
		}

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
	
	convertBookName(name) : string {
		if (name === "al-kafi" || name === "kafi")
			return "Kitab Al-Kafi";
		else 
			return "";
	}
	
	searchQuery(query) :  Promise<Array<any>> {
		return this.http.get(this.search_url + 'query=' + query)
					.map((res) => {
						// some manipulation
						return res.json()
					}).toPromise();		
	}
	
	searchExactQuery(book, by, query ) :  Promise<Array<any>> {
		return this.http.get(this.search_url + 'query=' + query + '&book=' + book + '&by=' + by)
					.map((res) => {
						// some manipulation
						console.log(res.json())
						return res.json()
					}).toPromise();		
}
	}
