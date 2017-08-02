$(document).ready(function() {

	// ----------------------------------------------------------
	// bms-carousel

	/*	carousel slide configuration
		
				+--------------------+----------+
				|                    |          |
				|                    |     2    |
				|                    |          |
			0	|         1          +----------+
				|       home         |          |
				|                    |     3    |	  4
				|                    |          |
				+--------------------+----------+
	
		0 and 4 are off canvas, but are styled and positioned to be ready to appear
	
		forward movement: 4 --> 3 --> 2 --> 1 --> 0
		reverse movement: 0 --> 1 --> 2 --> 3 --> 4

		x-fade slide onto each other in a cascading fashion
		after x-fade complete, clones are removed
	
	*/

	//	true = auto run carousel on start
	var	slideShowIsRunning=true,
	
	//	1. interval between each animation set
		slideInterval=6000,

	//	2. interval of each slide's animation
		animationInterval = 1250,
		
	//	3. interval of pause before next slide begins to animate
		staggerInterval = 200,

	/*
		---------------------------- slideInterval

									---------------- animationInterval of slide1

									-------- staggerInterval between 1 and 2

											---------------- animationInterval of slide2				

											-------- staggerInterval between 2 and 3

													---------------- animationInterval	of slide3
	*/

	//	first slide to show in "1" position, when page loads
	//	can also use 'first', 'last' or 'random'
	//	slide that appears in the first home position 
	//	firstSlide = 1~allSlides
		firstSlide = 1,

		showProgressBar = false,

	//	shouldn't need to adjust anything below here.

		$slides = $("#bms-carousel .bms-slide"),
		allSlides = ($slides.length)*1,

		visibleSlides = 3,
		
		// includes the two off canvas slides on either side of visible slides
		// to help prep all slides that could animate per interval
		totalPositions = visibleSlides+2, 

		intervalTimer,
		staggerTimer,

		allowClick=true,
		currPos=0,
		nextPos=0,
		slideVisible="slideVisible",
		cloneClass="carousel-clone";

	firstSlide = (firstSlide=="first") ?  1  :  (firstSlide=="last" || firstSlide>allSlides)  ?  allSlides  : (firstSlide=="random") ? rand(allSlides) : firstSlide;

	function createClones(direction){
		// remove previous clones
		removeClones();
		var	directionIndicator = (direction==1) ? "forward" : "reverse",
			cloneInstance = directionIndicator +"CloneOf",
			clonePosition = "clonePosition",
			cloneBG = "cloneImg",
			cloneNumber = (direction==1) ? 2 : 0,  //? [2,3,4] ? [0,1,2]
			clones,slideClone;
		// create and append clones inside carousel
		for (var i=0;i<3;i++){
			clones = $( ".position"+(cloneNumber+i) ).clone().removeClass(slideVisible);
			slideClone = cloneBG + ( (clones.attr("class")).match( /slide\d+/ ) ).toString().replace("slide","");
			clones.appendTo( "#bms-carousel #slides" )
				.addClass(  cloneClass + " "+ slideClone + " "+ cloneInstance + (i+cloneNumber)  + " "+ clonePosition+(i+1) )
				.attr('class',  function(i,cls) { if( /(slide||position)\d+/g.test( cls ) ) { return cls.replace(/ (slide||position)\d+/g,""); }}   );
		}
	}

	function removeClones(){
		$("."+cloneClass).remove();
	}

	function monitorEllipsis() {
		var ellipsisScriptExists = $.fn.dotdotdot ? true : false;
		//log("1 rechecking ellipsis....")
		if (ellipsisScriptExists) {			
			$( ".slide-text h4" ).each(function( index ) {
				//log("2 rechecking ellipsis...." + $(this).text())
				//dotdotdotText($(this).text())
			});
			
		}
	}

	function moveSlides(direction){
		// before animation starts create clones for x-fade
		createClones(direction);
		var	currPos = ($("#bms-carousel").attr( "data-current-pos")) ? ($("#bms-carousel").attr( "data-current-pos"))*1 : allSlides-1,
			nextPos = (currPos + direction < 0) ? allSlides-1 : (currPos + direction == allSlides) ? 0 : (currPos + direction);
		firstSlideToAnimate = (direction==1) ? 3 : 1
		staggerAnimation(direction, firstSlideToAnimate, nextPos, staggerInterval, 0);
	}
	
	// animation wrapped in setTimout, which controls the offset stagger
	function staggerAnimation (direction, slideToAnimate, nextPos, staggerTime, lc){
		var localCounter = lc;
		var allSlides = $('.'+slideVisible).length;
		// if on device, have all three animations happen at once, since only one is showing
		staggerTime = ( viewport().width<=768  ) ? 0 : staggerTime;
		clearTimeout(staggerTimer);
		if (localCounter<allSlides){
			staggerTimer = setTimeout(function(){
				// initiate animation
				$("#bms-carousel .position"+slideToAnimate).animate({opacity:0}, animationInterval, function(){
					// do final cleanup after last slide has finished animating
					if (localCounter==allSlides){
						removeClones();
						monitorEllipsis();
						setSlidePositions(nextPos);
						allowClick=true;
						
					}
				})
				// prep for next animation
				localCounter++;  
				slideToAnimate=slideToAnimate+(direction*-1); 
				// recurse on function and begin next animation
				staggerAnimation (direction, slideToAnimate, nextPos, staggerTime, localCounter);
			}, staggerTime);
			// setTimeout
		} // if
	};

	// after all animations finished, shifts slide class names onto new slides
	function setSlidePositions(nextPos){
		$("#bms-carousel").attr( "data-current-pos",nextPos);
		$slides.removeAttr("style").removeClass(slideVisible);
		$slides.each(function( index ) { $(this).attr('class',  function(i,cls) { if( /position\d/.test( cls ) ) { return cls.replace(/ position\d+/,""); }}   )});
		for(var i=0;i<totalPositions;i++){
			counter = ((i+nextPos)<allSlides) ? i+nextPos : i+nextPos-allSlides;
			positionIndex = (i+((totalPositions>3)?0:1))
			slideVisibleClass = (positionIndex>=1 && positionIndex<=3) ? slideVisible: "";
			var pos = "position"+positionIndex;
			$($slides[counter]).addClass(pos).addClass(slideVisibleClass);
		}		
		// advance slide index number in slide controller
		
		slideCurr = $slides.index( $(".position1") )*1+1
		//log("before text")
		$(".current-slide").text(slideCurr);
		//log("after text")
	}

	// toggle the pause/play
	function controlButtons(slideShowIsRunning){
		if (slideShowIsRunning){
			log("start the carousel");
			$("#control-pause .pause-button").removeClass("hidden");
			$("#control-pause .play-button").addClass("hidden");
		} else {
			log("stop the carousel");
			$("#control-pause .pause-button").addClass("hidden");
			$("#control-pause .play-button").removeClass("hidden");
		}	
	}
	
	// timer switch
	function controlTimer(intervalTime){
		if (slideShowIsRunning){
			log("start timer");
			slideShowIsRunning=false;
			startTimer(intervalTime);
		} else {
			log("stop timer");
			slideShowIsRunning=true;
			stopTimer(intervalTime);
		}
	}

	/*
	// timer 1.0
	// https://baijs.com/tinycarousel/
	// run the timer
	function startTimer (intervalTime){
		log("timer interval started");
		clearTimeout(intervalTimer);
		intervalTimer = setTimeout(function(){
			log("timer interval running");
			moveSlides(+1);
			startTimer (intervalTime);
		}, intervalTime);
		log("timer interval ended");
	};

	// stop the timer
	function stopTimer(intervalTime){
		clearTimeout(intervalTimer);
	};
	*/

	// timer 2.0
	// http://stackoverflow.com/questions/18417499/javascript-settimeout-for-progressbar-doesnt-work
	function startTimer(intervalTime) {
		var progress = 0;
		intervalTimer = setInterval(function () {
			if (showProgressBar) { $("#carousel-progress-bar").attr("style","width:"+progress + "%");}
			progress++;
			if (progress >= 100) {
				moveSlides(+1);
				clearInterval(intervalTimer)
				startTimer (intervalTime);
			}
		}, (intervalTime/100))
	}
	// stop the timer
	function stopTimer(intervalTime){
		clearInterval(intervalTimer);
		if (showProgressBar) { $("#carousel-progress-bar").removeAttr("style"); }
	};





	// carousel backward and forward buttons
	$(".control-arrow").on('click', function(event){
		event.preventDefault();
		if (allowClick){ // prevents animation overlap
			var direction = ($(this).is("#control-back")) ? -1 : 1;
			slideShowIsRunning=false;
			allowClick=false;
			controlButtons(slideShowIsRunning);
			controlTimer(slideInterval);
			moveSlides(direction);
		}		
		return false;
	})

	// pause button
	$("#control-pause").on('click', function(event){
		event.preventDefault();
		allowClick=true;
		controlButtons(slideShowIsRunning)
		controlTimer(slideInterval);
		return false;
	})

	$(".total-slides").text(allSlides);
	$("#bms-carousel").attr( "data-current-pos", $slides.index( $(".position"+ ((totalPositions>3)?0:1) ) ) );

	var	setFirstPosition = ((firstSlide-1+((totalPositions>visibleSlides)?0:1)) <1) ? (allSlides-1) : firstSlide-((totalPositions>visibleSlides)?2:1);
	setSlidePositions(setFirstPosition);

	// either run timer control
	// or, if autorun turned off, switch play/pause button
	if (slideShowIsRunning) { 
		controlTimer(slideInterval); 
	} else { 
		controlButtons(slideShowIsRunning);
		slideShowIsRunning=true;
	}

	// /bms-carousel

	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// Dynamic Responsive fonts
	// Modified from: designory.com
	function responsiveFonts(){
		var windowWidth = viewport().width; //$(window).width();
		var ratio = windowWidth / 1400;
		if (windowWidth < 768 || ratio>1) { $('#bms-carousel').removeAttr("style"); return false; }
		$('#bms-carousel').css('font-size',ratio + 'em');
	}
	$(window).ready(function(){responsiveFonts()}).resize(function(){responsiveFonts()});

	// ----------------------------------------------------------
	// ----------------------------------------------------------

	// add ellipsis to overly long carousel titles
	// and keep recalibrating on window resize
	$(".slide-text h4").dotdotdot({
		watch: "window"
	});

})