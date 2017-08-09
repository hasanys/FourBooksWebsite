import { Component } from '@angular/core';
import { DataAccessService } from './data-access.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private dataService:DataAccessService) {
	
  }
  
  someProperty:string = '';
  
  ngOnInit() { 
	this.someProperty = this.dataService.myData()
  }
  title = 'app';
  
  
}
