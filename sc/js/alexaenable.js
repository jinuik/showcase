 $(document).ready(function(){
   
   //$('.dashboardall').hide();
       $('.bigmessage').fadeIn('2000');
     // $('.bigmessage').fadeOut('100');
     hideall()
    });

function hideall(){
    $(".maindata").hide();
      $(".reviews").hide();
      $(".analytics").hide();
     $(".socialdata").hide();
}
  var socket = io();

var dataR;
socket.on('alexacommand', function(msg){
    dataR = msg;
    hideall();
    if(dataR.slots)
    {
        var cna = dataR.slots.COMMANDNAME.value;
            console.log(cna)
    }
    else if(dataR == "dashboard"){
         $('.dashboardall').fadeIn(1000);
    }else if (dataR == "main"){
        
    }
    $(".maindata").fadeIn(1000);
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