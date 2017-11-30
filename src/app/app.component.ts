import { Component } from '@angular/core';
import { DataAccessService } from './data-access.service'
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './bootstrap/bootstrap.css']
})
export class AppComponent {

  constructor( private dataService:DataAccessService, private router: Router ) {
	
  }
  result:Array<Object>; 

  ngOnInit() { 
    //this.dataService.myData().then(result => this.result = result);
	this.router.events.subscribe((evt) => {
	if (!(evt instanceof NavigationEnd)) {
		return;
	}
	window.scrollTo(0, 0)
	});
	
  }
  title = 'app';
}
