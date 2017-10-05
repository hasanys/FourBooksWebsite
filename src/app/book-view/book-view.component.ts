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
  input_data;
  title;
  private var2: string;
  content:Array<Object>;
  content_title;

  constructor( 
	private dataService:DataAccessService,
	private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
	this.route.params.subscribe((input_data) => this.input_data = input_data);
	
	if (this.input_data.id) { //Full view
		this.dataService.getAlKafiContentName(this.input_data.id).then(content_title => this.content_title  = content_title );
		this.dataService.getAlKafiContent(this.input_data.id).then(content => this.content = content);
	}
	else if (this.input_data.query) { //Search Results
		if (!this.input_data.by) { //Simple search
			var search_value = $("#search-nonexact").val()
			this.dataService.searchQuery(search_value).then(content => this.content  = content );
		}
		else { // Advanced Search
			var book = $("#search-book-filter").find(":selected").text();
			var by = $("#search-narrated-filter").val()
			var phrase = $("#search-exact-filter").val()
			this.dataService.searchExactQuery(book, by, phrase).then(content => this.content  = content );
		}
	}
	else { //Single Hadith
	    var book = this.input_data.book == "null" ? $("#exact-book-filter").find(":selected").text() : this.input_data.book ;
		if (book == "Al-Kafi") { book = "al-kafi"; } 

		this.title = this.dataService.convertBookName(this.input_data.book);
		//if (this.input_data.content !== undefined) //Get the Book title from database
			//this.dataService.getAlKafiContentName(this.input_data.content).then(content_title => this.content_title  = content_title );
	  
		if (this.input_data.hadith === undefined) { //Got by volume
			var content = this.input_data.content == "null" ?  $("#navigate-volume-filter").val() : this.input_data.content;
			var chapter = this.input_data.chapter == "null" ?  $("#navigate-chapter-filter").val() : this.input_data.chapter;
			var number = this.input_data.number == "null" ?  $("#navigate-number-filter").val() : this.input_data.number;
			this.dataService.getHadith(book, content, chapter, number, -1).then(content => this.content = content);
		} else { //Got by absolute hadith number
			var number = this.input_data.hadith == "null" ?  $("#exact-number-filter").val() : this.input_data.hadith;
			console.log(book);
			this.dataService.getHadith(book, -1, -1, -1, number).then(content => this.content = content);
		}
	}
  }
  
  ngOnDestroy() {
  }
  
  ngAfterViewInit(): void {
	  setTimeout(function() { 
        $("#collapsable-parent").hover(
            function(){
				
				setTimeout(function () { $(".chapter-name").removeClass("nav-text-name-hidden") }, 500);
                $(this).animate({ "width" : "50%"}, 'fast', 'swing', function() { }); 
            },
            function(){
				setTimeout(function () { $(".chapter-name").addClass("nav-text-name-hidden") }, 500);
				
                $(this).animate({ "width" : "12%" }, 'fast', 'swing');
            }
        );                             
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
			setTimeout(function () { $(".chapter-name").addClass("nav-text-name-hidden") }, 350);
			$("#collapsable-parent").animate({ "width" : "12%" }, 'fast', 'swing');
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

	public open_module(item) {
		//$(modal.style.display = "block";
		$(".modal").show()
		$("#inputlg").val(item)
		$( ".close" ).click(function() {
			$( ".modal" ).hide();
		});
	}
}