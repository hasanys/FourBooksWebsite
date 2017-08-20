import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataAccessService } from '../data-access.service'

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css', '../bootstrap/bootstrap.css']
})
export class BookViewComponent implements OnInit {
  private id;
  private var2: string;
  content:Array<Object>;
  content_title;

  constructor( 
	private dataService:DataAccessService,
	private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
	this.route.params.subscribe((id) => this.id = id);
	console.log(this.id)
	this.dataService.getAlKafiContentName(this.id.id).then(content_title => this.content_title  = content_title );
	this.dataService.getAlKafiContent(this.id.id, -1, -1, -1).then(content => this.content = content);
  }
  
  ngOnDestroy() {
  }
}
