 $(document).ready(function(){
   
     
    });
  var socket = io();

socket.on('alexacommand', function(msg){

    console.log(msg);
  });
    
     socket.on('getoverallsales', function(msg){

       console.log(msg);
  });
    
    
    
    
    
//    socket.on('getoverallsales', function(msg){
////    io.emit('alexacommand', msg);
//        if(msg == 'overallsales'){
//            socket.emit('getoveralltradesales',  'overallsales' )
//     $(".stage1").fadeIn(1000);
//    $(".stage2").hide(1000);
//    console.log(msg);
//  });
//});