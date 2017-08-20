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
  constructor( private dataService:DataAccessService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
	  this.route.params.subscribe((title) => this.title = title);

	  this.dataService.getAlKafiChapterNames(-1).then(description => this.description = description); //Using part=-1 for description
	  this.dataService.getAlKafiChapterNames(1).then(titles_1 => this.titles_1 = titles_1);
  	  this.dataService.getAlKafiChapterNames(2).then(titles_2 => this.titles_2 = titles_2);

	  
  }

}
