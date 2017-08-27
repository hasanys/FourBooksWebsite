import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataAccessService } from '../data-access.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-hadith-view',
  templateUrl: './hadith-view.component.html',
  styleUrls: ['./hadith-view.component.css', '../book-view/book-view.component.css']
})
export class HadithViewComponent implements OnInit {
  headers; //:book/:content/:chapter/:number
  title;
  content_title;
  content:Array<Object>;
  
  constructor(
  	private dataService:DataAccessService,
	private route: ActivatedRoute,
    private router: Router
	) { }

  ngOnInit() {
	  this.route.params.subscribe((headers) => this.headers = headers);
	  this.title = this.dataService.convertBookName(this.headers.book);

	  if (this.headers.content !== undefined)
		this.dataService.getAlKafiContentName(this.headers.content).then(content_title => this.content_title  = content_title );
	  
	  if (this.headers.hadith === undefined)
		this.dataService.getHadith(this.headers.book, this.headers.content, this.headers.chapter, this.headers.number, -1).then(content => this.content = content);
	  else{
  		this.dataService.getHadith(this.headers.book, -1, -1, -1, this.headers.hadith).then(content => this.content = content);
		}
		setTimeout(function() { console.log(this.content) }, 5000) 
  }

}
