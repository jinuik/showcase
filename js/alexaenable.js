 $(document).ready(function(){
   
     $(".stage1").hide();
     
    });
  var socket = io();

var dataR;
socket.on('alexacommand', function(msg){
dataR = msg;
    $(".stage1").fadeIn(1000);
    $(".stage2").hide(1000);
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