
$(document).ready(function() {


	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// override onclick to include onhover for 
	// top right fixed navBar and stop static nav on desktop only
	var openFromHover = "openFromHover";
	$( ".dropdown" )
		.hover(function() { // mouseover
			var w = viewport().width;
			if	(w>767){ 
				$("a",$(this)).attr("aria-expanded","true");
				$($(this)).addClass(openFromHover).addClass("open");
			}
		}, function() { // mouseout
			var w = viewport().width;
			if	(w>767){ 
				$(".dropdown.open a").attr("aria-expanded","false");
				$(".dropdown.open").removeClass(openFromHover).removeClass("open");
			}
		})
		// keeps menu open even if user clicks on header 
		// which under normal Bootstrap UI, would have closed menu
		.on('hidden.bs.dropdown', function () {
			var w = viewport().width;
			if	(w>767){
				if($(this).hasClass(openFromHover)) { $(this).addClass("open") }
				$("a",$(this)).attr("aria-expanded","true");
			}
		})

	// ----------------------------------------------------------
	// ----------------------------------------------------------
	
	// search button override activation
	
	// search override open
	//var bodyCSS = (getElementStyle("body","marginTop").replace("px","")*1);
	var $body = $('BODY');
	var initialMarginTop = parseFloat($body.css('margin-top'));
	var $targetSearch = $("#search-site")
	var targetHeight = $targetSearch.outerHeight();
	var $navBar = $('#global-navbar');
	var searchAnimation = "'slow'";

	// close search bar occurs under two conditions
	// 1. click on the toggle button that opened the search
	// 2. click anywhere outside search drop down
	function closeSearchBar($_this){
		if (!$targetSearch.hasClass('closed')) {
			$("#search-site").removeClass("elevateZ");
			$("body").animate({marginTop:initialMarginTop+"px"}, searchAnimation, function(){
				$_this.removeAttr("style");
				$targetSearch.addClass('closed'); //.css({opacity: 0});
				$_this.removeClass('active');
			});
			$("#global-navbar").animate({top:"0px"}, searchAnimation, function(){
				$_this.removeAttr("style");
			})
			$("#flyout-container").animate({top:"0px"}, searchAnimation, function(){
				$_this.removeAttr("style");
			})
		}
		$_this.blur();
	}	

	// close certain items when clicking outside itself
	$(document).on('click', function(e) {
		var $targetHamburger = $("#insite-flyout")
		// close search bar or close hamburger
		if(	!$.contains($targetSearch.get(0), e.target)  
			&& $targetSearch.get(0)!=e.target 
			&& (!$.contains($targetHamburger.get(0), e.target)  
			&& $targetHamburger.get(0)!=e.target)
			&& !$(e.target).hasClass("backToTop")   ) {
				toggleHamburger(e,false);
				closeSearchBar($('#search-toggle'));
		}
	});

	// toggle search bar (magnifying glass)
	$('#search-toggle').on('click', function (ev) {	
		toggleHamburger(ev,false)
		//ev.preventDefault();
		var $this = $(this);
		if ($targetSearch.length) {
			if ($targetSearch.hasClass('closed')) {
				$targetSearch.removeClass('closed'); //.css({opacity: 1});
				$this.addClass('active');			
				$("body").animate({marginTop:initialMarginTop+targetHeight+"px"}, searchAnimation);
				$("#global-navbar").animate({top:targetHeight+"px"}, searchAnimation, function(){
					$("#search-site").addClass("elevateZ")
				})
				$("#flyout-container").animate({top:targetHeight+"px"}, searchAnimation);
			} else {				
				closeSearchBar($this)
			}
		} else {
			console.error('Target is not found!');
		}
	}); 
	// end search override

	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// left sliding drawer

	var	hamburgerFlyoutAnimation = 400,   //"'slow'",
		calcInterval = 6,
		calcIntervalFraction = calcInterval/2,
		iconAnimation = hamburgerFlyoutAnimation/calcInterval,
		iconAnimationCloseDelay = (hamburgerFlyoutAnimation/calcInterval)*calcIntervalFraction,
		iconAnimationClose = (hamburgerFlyoutAnimation/calcInterval)*calcIntervalFraction,
		flyoutStartCSS = Math.abs(Math.round(parseFloat($("#insite-flyout").css('left')))),
		hamburgerTabStart = Math.round(parseFloat($("#insite-flyout-tab").css('right')));

	function toggleHamburger(event,hasBeenClicked){
		closeSearchBar($('#search-toggle'));
		var target = "#"+$("#insite-flyout-tab").attr("data-target");
		//tabw =$this.outerWidth(),, w = $(target).outerWidth(); //-tabw
		//var fcow = $("#insite-flyout-tab .bmsglyph").outerWidth();
		//offset=19;
		//log(tabw +", " + fcow +", " + w)
		//event.preventDefault();
		//log($(target).outerWidth() + " - " + tabw);
		if ($(target).hasClass("closed") && hasBeenClicked) { //open
			//alert("opening")
			$("#insite-flyout").css({"bottom":"0","height":"100%"})
			$("#insite-flyout-tab").animate({right:"15px"}, iconAnimation);
			// " data-target="insite-flyout"><span class="
			$("#insite-flyout-tab .bmsglyph").removeClass("bmsglyph-hamburgerIconNotify").addClass("bmsglyph-hamburgerIcon");
			$(target).animate({left:"+="+flyoutStartCSS+"px"}, hamburgerFlyoutAnimation, function(){
				$(target).removeClass("closed").addClass("open");
			});
			//insite-flyout-menu
			$( "#insite-flyout-menu" ).removeClass("closed").fadeTo( hamburgerFlyoutAnimation, 1 );
		} else if ($(target).hasClass("open") ) { //close
			//alert("closing")
			closeAnimationRate = (hamburgerFlyoutAnimation/hamburgerTabStart);
			$("#insite-flyout-tab").delay(iconAnimationCloseDelay).animate({right:hamburgerTabStart+"px"}, iconAnimationClose, function(){
				$(this).removeAttr("style");
			});
			$(target).animate({left:"-="+flyoutStartCSS+"px"}, hamburgerFlyoutAnimation, function(){
				$( "#insite-flyout-menu" ).removeAttr("style")
				$(target).addClass("closed").removeClass("open").removeAttr("style");
				$("#insite-flyout-tab .bmsglyph").removeClass("bmsglyph-hamburgerIcon").addClass("bmsglyph-hamburgerIconNotify");
			});	
			$( "#insite-flyout-menu" ).fadeTo( hamburgerFlyoutAnimation, 0, function(){
				$(this).addClass("closed").removeAttr("style");
				$("#insite-flyout").removeAttr("style");
				closeAllAccordionTabs("#flyout-container");
			});
		}
	}

	$("#insite-flyout-tab").click( function(event){
		toggleHamburger(event,true)
		return false;
	}); 
	// end slideout

	// ----------------------------------------------------------
	// ----------------------------------------------------------
	
	// poll questions bar graph animation
	
	var progressBarAnimation = "2000";
	
	// animate progressbar
	function animateProgressBar(){
		$(".progress-bar").each(function( index ) {
			$( this ).css("width","0%");
		});
		$(".progress-bar").each(function( index ) {
			$( this ).animate({
				width: $( this ).attr("data-result")
			}, progressBarAnimation);
		});
	} 
	// end animate

	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// poll submit button
	
	$(".poll-question-question .btn-submit").click( function(event){
		var $this = $(this);
		event.preventDefault();
		// ajax
		$(".poll-question-question").addClass("hidden");
		$(".poll-question-results").removeClass("hidden");
		animateProgressBar();
		return false;
	}); 
	// end poll submit			

	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// remove on production

	// testing only: reset poll window
	$("#modal-poll-trigger").click( function(event){
		var $this = $(this);
		if ( $(".poll-question-question").hasClass("hidden") ) {
			$(".poll-question-question").removeClass("hidden");
			$(".poll-question-results").addClass("hidden");
		}
	}); 
	// testing only			

	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// blue personalization bar

	var personalizationAnimation = "'slow'";

	// HOMEPAGE: personalization menu
	// toggle blue personalization sliding drawer
	$("#homepage-account-settings #user-menu-control").click( function(event){
		var $this = $(this), target = this.getAttribute("data-target"), w = $(target).outerWidth();
		log(target)
		event.preventDefault();
		if ($(target).hasClass("closed") ) { //open
			$(target).animate({left:"-="+w+"px"}, personalizationAnimation, function(){
				$(target).removeClass("closed");
				$("span",$this).removeClass("bmsglyph-arrowLeftBold").addClass("bmsglyph-cancel");
			});	
		} else { //close
			$(target).animate({left:"+="+w+"px"}, personalizationAnimation, function(){
				$(target).addClass("closed").removeAttr("style");
				$("span",$this).removeClass("bmsglyph-cancel").addClass("bmsglyph-arrowLeftBold");
			});	
		}
		return false;
	}); 
	// end slideout

	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// INNER PAGES: personalization menu
	
	var ipas = $("#innerpage-account-settings").css('right');
	$("#innerpage-account-settings #user-menu-control").click( function(event){
		var $this = $(this), p = $(this).parent().parent().parent().parent();

		if (!$(p).hasClass("open")) {
			$(p).animate({right:"0px"}, personalizationAnimation, function(){
				$(p).addClass("open"); //.removeAttr("style");
				//$this.children(".bmsglyph").removeClass("bmsglyph-arrowLeftBold").addClass("bmsglyph-cancel");
			});
		} else {
			$(".acct-setting.open").removeClass("open");
			$(p).animate({right:ipas}, personalizationAnimation, function(){
				$(p).removeClass("open"); //.removeAttr("style");
				//$this.children(".bmsglyph").addClass("bmsglyph-arrowLeftBold").removeClass("bmsglyph-cancel");
			});
		}
			
		$(p).toggleClass("open");
		$(this).children(".bmsglyph").toggleClass('bmsglyph-arrowLeftBold bmsglyph-cancel');

	});

	// #innerpage-account-settings .acct-menu-head .bmsglyph 
	$('#innerpage-account-settings .acct-menu-head').click(function(){
		$(this).parent().toggleClass("open")
		//Hide the other panels
		$("#innerpage-account-settings .acct-setting").not($(this).parent()).removeClass("open")
	});


	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// poll modal trigger
	// http://dixso.github.io/custombox/
	$('#modal-poll-trigger').on('click', function ( e ) {
		Custombox.open({
			target: '#modal-poll',
			effect: 'blur'
		});
		e.preventDefault();
	});
	// poll modal trigger

	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// back to top
	// http://codyhouse.co/gem/back-to-top/
	// d=r*t  or  r=d/t  or  t=d/r

	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
	
	//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
	offset_opacity = 700,
	
	//duration of the top scrolling animation (in ms)
	scroll_top_duration = 700,
	distance_from_top = 0,
	rate_of_return = 750,
	evenRateOfReturn = false,

	//grab the "back to top" link
	$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		distance_from_top = $(this).scrollTop();
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) {  $back_to_top.addClass('cd-fade-out');  }
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		if (evenRateOfReturn) { 
			scroll_top_duration = Math.ceil((distance_from_top/rate_of_return)*100); 
			//log("stt: " + scroll_top_duration + " = " + distance_from_top + " / " + rate_of_return + " * 100" );
		}
		event.preventDefault();
		$('body,html').animate( { scrollTop: 0 , }, scroll_top_duration );    // , 'easeInOutExpo', function() {}
	});

	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// http://uniondesign.ca/simple-accordion-without-jquery-ui/
	
	// multi-level accordion:   http://jsfiddle.net/Xanetia/8kz4m/
	
	
	var firstAccordionOpen = false;	
	
	if (firstAccordionOpen) { $('#accordion .accordion-content').first().addClass("open") }
	
	// resets the left flyout accordion
	// if user clicked any open, will close all
	// so far user only in the toggleHamburger()
	function closeAllAccordionTabs(thisAccordionContainer){
		$(thisAccordionContainer + " .accordion-toggle").removeClass("open");
		$(thisAccordionContainer + " .accordion-content").removeClass("open");
	}

	function accordionToggle(fThis,at){
		var accordionTime = (at) ? at : 600;
		log(accordionTime)
		// reset/toggle carets
		$(fThis).toggleClass("open");
		$(".accordion-toggle",$(fThis).parent()).not($(fThis)).removeClass("open");
		//Expand or collapse this panel
		$(fThis).next().slideToggle(accordionTime, function(){ $(fThis).toggleClass("open").removeAttr("style");	});
		//Hide the other panels
		$(".accordion-content",$(fThis).parent()).not($(fThis).next()).slideUp(accordionTime, function(){   $(fThis).removeClass("open").removeAttr("style");   });
	}

	$('#flyout-container .accordion').find('.accordion-toggle').click(function(){
		accordionToggle(this)
	});

	$('.faq-accordion').find('.accordion-toggle').click(function(){
		accordionToggle(this)
	});

	$('.article-accordion').find('.accordion-toggle').click(function(){
		accordionToggle(this)
	});

	$('.highlight-accordion').find('.accordion-toggle').click(function(){
		accordionToggle(this)
	});


	// ----------------------------------------------------------



	// draggable items
	// http://rubaxa.github.io/Sortable/
	var el = document.getElementById('acct-draggable-items');
	new Sortable(el, { handle: ".drag-handle"});


/*
$(this).previous().toggleClass(function() { log($( this ));
	if ( $( this ).hasClass( ".open" ) ) {return "arrowDown";} else {return "arrowRight";}
});
*/

	// ----------------------------------------------------------
	// ----------------------------------------------------------

})
// $(document).ready(function(){})


// ----------------------------------------------------------
// ----------------------------------------------------------
	
function log(m) {if (window.console) {console.log(m);}}

// ----------------------------------------------------------
// ----------------------------------------------------------

// The Central Randomizer 1.3 (C) 1997 by Paul Houle (paul@honeylocust.com)
// http://www.honeylocust.com/javascript/randomizer.html
rnd.today=new Date();
rnd.seed=rnd.today.getTime();
function rnd() { rnd.seed = (rnd.seed*9301+49297) % 233280; return rnd.seed/(233280.0); };
function rand(number) { return Math.ceil(rnd()*number); };

// ----------------------------------------------------------
// ----------------------------------------------------------

/*	http://stackoverflow.com/questions/754607/can-jquery-get-all-css-styles-associated-with-an-element 
	relies on jquery 
function getElementStyle(el,prop) { return document.defaultView.getComputedStyle($(el)[0], null)[prop]; }
*/

// ----------------------------------------------------------
// ----------------------------------------------------------

// gets CSS width
// http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
function viewport(){
	var e = window, a = 'inner'; 
	if ( !( 'innerWidth' in window ) )
		{ a = 'client'; e = document.documentElement || document.body;} 
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] } 
}

// ----------------------------------------------------------
// ----------------------------------------------------------

// query string parser
function parseQuery(fldNm){
	var oRe = new RegExp("[\\?&]"+fldNm+"=([^&#]*)","i");
	var fldVal = oRe.exec(parent.location.search);
	return (fldVal) ? unescape(fldVal[1]) : "";
}




