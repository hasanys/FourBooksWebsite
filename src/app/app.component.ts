import { Component } from '@angular/core';
import { DataAccessService } from './data-access.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './bootstrap/bootstrap.css']
})
export class AppComponent {

  constructor( private dataService:DataAccessService ) {
	
  }
  result:Array<Object>; 

  ngOnInit() { 
    console.log("Getting data now:")
	this.dataService.myData().then(result => this.result = result);
	
	
  }
  title = 'app';
}
