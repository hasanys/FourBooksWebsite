import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataAccessService } from '../data-access.service'
import {PipeTransform, Pipe} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser'

declare var $: any;

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

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
  search_phrase: string;
  book_name: string;
  
  constructor( 
	private dataService:DataAccessService,
	private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
	this.route.params.subscribe(input_data => {
		
	this.input_data = input_data
	
	if (this.input_data.id) { //Full view
		this.book_name = this.input_data.name
		this.dataService.getAlKafiContentName(this.input_data.id).then(content_title => this.content_title  = content_title );
		this.dataService.getAlKafiContent(this.input_data.id).then(content => this.content = content);
		
	}
	else if (this.input_data.query) { //Search Results
		this.book_name = 'al-kafi'
		if (!this.input_data.by) { //Simple search
			var search_value = $("#search-nonexact").val().trim()
			this.search_phrase = search_value;
			this.dataService.searchQuery(search_value).then(content => this.content  = content ).catch(() => "failed").then(() => this.highlight_function() );
		}
		else { // Advanced Search
			var book = $("#search-book-filter").find(":selected").text();
			var by = $("#search-narrated-filter").val()
			var phrase = $("#search-exact-filter").val().trim();
			this.search_phrase = phrase
			this.dataService.searchExactQuery(book, by, phrase).then(content => this.content  = content ).catch(() => "failed").then(function() { console.log("2 Gets here at the end?") } );
		}
		
	}
	else { //Single Hadith

		this.book_name = this.input_data.book
		this.title = this.dataService.convertBookName(this.input_data.book);
  
		if (this.input_data.hadith === undefined) { //Got by volume
			this.dataService.getHadith(this.input_data.book, this.input_data.content, this.input_data.chapter , this.input_data.number, -1).then(content => this.content = content);
		} else { //Got by absolute hadith number
			this.dataService.getHadith(this.input_data.book, -1, -1, -1, this.input_data.hadith).then(content => this.content = content);
		}
	}
	}
	);
  }
  
  ngOnDestroy() {
  }
  
  ngAfterViewInit(): void {
	  
	  setTimeout(function() { 
        $("#collapsable-parent").hover(
            function(){
				
				setTimeout(function () { $(".chapter-name").removeClass("nav-text-name-hidden") }, 250);
                $(this).animate({ "width" : "50%"}, 'fast', 'swing', function() { }); 
            },
            function(){
				setTimeout(function () { $(".chapter-name").addClass("nav-text-name-hidden") }, 150);
				
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
		  if (this.search_phrase && this.search_phrase.length > 0) {
			  $.fn.wrapInTag = function(opts) {
  
			  var tag = opts.tag || 'strong',
				  words = opts.words || [],
				  regex = RegExp("\\b" + words.join('\\b|\\b') + "\\b", 'gi'),
				  replacement = '<'+ tag +'>$&</'+ tag +'>';

			  return this.html(function() {
				return $(this).text().replace(regex, replacement);
			  });
			};
		  }

	  }
	public highlight_function() {
		 
		 setTimeout( this.do_highlight, 4000, this.search_phrase)
	}
	
	public do_highlight(phrase) {
		var res = phrase.split(" ");
			$('.normal-text').wrapInTag({
				tag: 'mark',
				words: res
			});
	}
	
	public open_module(item) {
		$('#copy-outcome').css('opacity', 0);
		//$(modal.style.display = "block";
		$(".modal").show()
		$("#inputlg").val(item)
		$( ".close" ).click(function() {
			$( ".modal" ).hide();
		});
		
		var url = $("#inputlg").val()
		$("#share-email").attr("href", "mailto:?Subject=Shared%20Hadith%20from%20Four%20Shia%20Books...&amp;Body=Check%20out%20this%20hadith%20I%20shared%20with%20you!%20 " + url)
		$("#share-fb").attr("href", "http://www.facebook.com/sharer.php?u=" + url + "=")
		$("#share-twitter").attr("href", "https://twitter.com/share?url=" + url + "&amp;text=Check%20out%20this%20Hadith;hashtags=ShiaHadith,FourShiaBooks")
		$("#share-reddit").attr("href", "http://reddit.com/submit?url=" + url + "&amp;title=Shia Hadith")
		$("share-fb").attr("style", "transform: translateY(7px)");
		}
	
	public copyToClipboardMsg() {
		
		var elementId = "inputlg"
		try {
   	  var aux = document.createElement("input");
		aux.setAttribute("value", $("#inputlg").val());
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		document.getElementById("copy-outcome").innerHTML = "Copied to clipboard"
		if ($('#copy-outcome').css('opacity') == 0) $('#copy-outcome').css('opacity', 1);
		} catch (err) {
			document.getElementById("copy-outcome").innerHTML = "Failed to copy, please select the text and use Control+C to copy"
		}
		document.body.removeChild(aux);
	}
}