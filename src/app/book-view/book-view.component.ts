import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataAccessService } from '../data-access.service'
declare var $: any;

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
  
  ngAfterViewInit(): void {
	  setTimeout(function() { 

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 75
        }, 750, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
	  }, 1000);
  }
}
