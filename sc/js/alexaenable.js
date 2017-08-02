 $(document).ready(function(){
   
 //  $('.dashboardall').hide();  hideall()
       $('.bigmessage').show();
//      $('.bigmessage').fadeOut('100');
   
    });
//function showall(){
//     $(".maindata").show();
//      $(".reviews").show();
//      $(".analytics").show();
//     $(".socialdata").show();  
//}
//function hideall(){
//    // $('.bigmessage').hide();
//    $(".maindata").hide();
//      $(".reviews").hide();
//      $(".analytics").hide();
//     $(".socialdata").hide();
//}
  var socket = io();

var dataR;
socket.on('alexacommand', function(msg){
    dataR = msg;
  //  hideall();
     showall();
    if(dataR.slots)
    {
        var cna = dataR.slots.COMMANDNAME.value;
        console.log(cna);
        if(cna == "analytics"){
             $(".analytics").fadeIn(1000);
           
        }else if(cna == "reviews"){
             $(".reviews").fadeIn(1000);
                $('html, body').animate({scrollTop:$('.reviews').offset().top}, 'slow');
            $('.selectedcard').removeClass('selectedcard');
        $('#my-news').addClass('selectedcard');
        }else if(cna == "tweets"){
             $(".socialdata").fadeIn(1000);
            $('html, body').animate({scrollTop:$('.socialdata').offset().top}, 'slow');
            $('.selectedcard').removeClass('selectedcard');
        $('#twitter').addClass('selectedcard');
        }else if(cna == "twitter"){
             $(".socialdata").fadeIn(1000);
            $('html, body').animate({scrollTop:$('.socialdata').offset().top}, 'slow');
            $('.selectedcard').removeClass('selectedcard');
        $('#twitter').addClass('selectedcard');
        }else if(cna == "inventory"){
             $(".maindata").fadeIn(1000);
            $('html, body').animate({scrollTop:$('.maindata').offset().top}, 'slow');
            $('.selectedcard').removeClass('selectedcard');
        $('#inventory').addClass('selectedcard');
        }else if(cna == "calendar"){
             $(".maindata").fadeIn(1000);
            $('html, body').animate({scrollTop:$('.maindata').offset().top}, 'slow');
            $('.selectedcard').removeClass('selectedcard');
        $('#calendar').addClass('selectedcard');
        }else if(cna == "creditapp"){
             $(".maindata").fadeIn(1000);
            $('html, body').animate({scrollTop:$('.maindata').offset().top}, 'slow');
            $('.selectedcard').removeClass('selectedcard');
        $('#creditapp').addClass('selectedcard');
        }
    }
    else if(dataR == "dashboard"){
          $('.bigmessage').fadeOut(500);
        $('.dashboardall').fadeIn(1000);
    }else if (dataR == "inventory"){
            $(".maindata").fadeIn(1000);
           $('html, body').animate({scrollTop:$('.maindata').offset().top}, 'slow');
        $('.selectedcard').removeClass('selectedcard');
        $('#inventory').addClass('selectedcard');
    
    }else if (dataR == "tweets"){
         $(".socialdata").fadeIn(1000);
           $('html, body').animate({scrollTop:$('.socialdata').offset().top}, 'slow');
            $('.selectedcard').removeClass('selectedcard');
        $('#twitter').addClass('selectedcard');
    }else if (dataR == "analytics"){
         $(".analytics").fadeIn(1000);
          $('html, body').animate({scrollTop:$('.analytics').offset().top}, 'slow');
        $('.selectedcard').removeClass('selectedcard');
        $('#sales').addClass('selectedcard');
    }else if (dataR == "calendar"){
        $(".maindata").fadeIn(1000);
           $('html, body').animate({scrollTop:$('.maindata').offset().top}, 'slow');
        $('.selectedcard').removeClass('selectedcard');
        $('#calendar').addClass('selectedcard');
    }else if (dataR == "creditapp"){
        $(".maindata").fadeIn(1000);
           $('html, body').animate({scrollTop:$('.maindata').offset().top}, 'slow');
        $('.selectedcard').removeClass('selectedcard');
        $('#creditapp').addClass('selectedcard');
    }else if (dataR == "exit"){
       // hideall();
         $('.bigmessage').show();
    } else if(dataR == "report"){
          $(".analytics").fadeIn(1000);
          $('html, body').animate({scrollTop:$('.analytics').offset().top}, 'slow');
                $('.selectedcard').removeClass('selectedcard');
        showF150();
        $('#report').addClass('selectedcard');
    } else if(dataR == "twitter"){
          $(".socialdata").fadeIn(1000);
          $('html, body').animate({scrollTop:$('.socialdata').offset().top}, 'slow');
                $('.selectedcard').removeClass('selectedcard');
        //showF150();
        $('#twitter').addClass('selectedcard');
    } else if(dataR == "reviews"){
          $(".reviews").fadeIn(1000);
          $('html, body').animate({scrollTop:$('.reviews').offset().top}, 'slow');
                $('.selectedcard').removeClass('selectedcard');
        //showF150();
        $('#my-news').addClass('selectedcard');
    }
   
   // $(".stage2").hide(1000);
   // processData();
    console.log(msg);
  });
    
 /* socket.on('getoverallsales', function(msg){

       console.log(msg);
  });*/
    
/*    function processData(){
        
        if(dataR == 'overallsales')
        {
        }
          else if(dataR == 'dashboard')
          {
              initViz();
          }
            if(dataR.slots){

    if(dataR.slots.COMMANDNAME.value == "engineering")
        selectCollege('Engineering')
    else if (dataR.slots.COMMANDNAME.value == "music")
          selectCollege('Music')
                else if (dataR.slots.COMMANDNAME.value == "business")
          selectCollege('Business')
     else if (dataR.slots.COMMANDNAME.value == "all")
          markall();
else if (dataR.slots.COMMANDNAME.value == "data")
          getDataFromSheet();
    }
}*/

    
    
    
    
//    socket.on('getoverallsales', function(msg){
////    io.emit('alexacommand', msg);
//        if(msg == 'overallsales'){
//            socket.emit('getoveralltradesales',  'overallsales' )
//     $(".stage1").fadeIn(1000);
//    $(".stage2").hide(1000);
//    console.log(msg);
//  });
//});