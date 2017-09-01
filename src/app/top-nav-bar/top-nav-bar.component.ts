import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css', '../bootstrap/bootstrap.css']
})
export class TopNavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onFlagChange(e) : void {
	if (e){ 
	$("#non-exact").show()
		$("#exact").hide()
	}
	else {
		$("#non-exact").hide()
		$("#exact").show()		
	}
  }
  
  ngAfterViewInit(): void {
	  //Prevent drop-down closing on click inside
	$('.dropdown-menu').on("click.bs.dropdown", function (e) { e.stopPropagation(); e.preventDefault(); });
  } 
}
