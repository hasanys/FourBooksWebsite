import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../data-access.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-main',
  templateUrl: './book-main.component.html',
  styleUrls: ['./book-main.component.css']
})
export class BookMainComponent implements OnInit {

  titles_1:Array<Object>; 
  titles_2:Array<Object>; 
  description;
  title;
  book_title;
  constructor( private dataService:DataAccessService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
	  this.route.params.subscribe((title) => this.title = title);
	  this.book_title = this.dataService.convertBookName(this.title.name);

	  if (this.title.name == "al-kafi") {
		  
		  this.dataService.getChapterNames("al-kafi", -1).then(description => this.description = description); //Using part=-1 for description
		  this.dataService.getChapterNames("al-kafi", 1).then(titles_1 => this.titles_1 = titles_1);
		  this.dataService.getChapterNames("al-kafi", 2).then(titles_2 => this.titles_2 = titles_2);
	  }
	  else if (this.title.name == "al-ahkam") {
 		  this.dataService.getChapterNames("al-ahkam", -1).then(description => this.description = description); //Using part=-1 for description

		  this.dataService.getChapterNames("al-ahkam", 1).then(titles_1 => this.titles_1 = titles_1);
	  }
  }

}
