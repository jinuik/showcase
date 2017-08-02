var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

var server = require('http').createServer(app);  
var io = require('socket.io')(server);


var S;
io.on('connection', function(socket){
    S = socket;
  console.log('a user connected');
});

app.use('/', express.static(__dirname + ''));
app.get('/sf', function(req,res){
    socketFunction('hi');
    res.send('done')
    
});
// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("test");

alexaApp.express({
  expressApp: app,

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: true
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");



alexaApp.launch(function(request, response) {
  request.getSession().set();
//  response.say("Welcome to ShowCase App. I am Hella, a Brillio AI Bot on Alexa Echo Dot.");
     response.say("Welcome to m Power by Ford Direct on Echo Dot. How can I help you? ");
   // socketFunction('dashboard')
 // response.shouldEndSession(false);
  response.shouldEndSession(false);
});


alexaApp.dictionary = { "names": ["analytics","twitter","tweets","calendar","reviews"]}
alexaApp.intent("interactIntent", {
    "slots": { "COMMANDNAME": "LITERAL" },
    "utterances": [
      "bring up {command|COMMANDNAME}", "can you open {command|COMMANDNAME}","can you show me {command|COMMANDNAME}"
    ]
  },
  function(request, response) {
   // console.log(request.data.request.intent);
     socketFunction(request.data.request.intent)
    console.log('hitting this page')
   response.shouldEndSession(false);
    response.say("Ok.");
  }
);




alexaApp.intent("opendash", {
    "utterances": [
      "open dashboard", "Open m power Dashboard"
    ]
  },
  function(request, response) {
    console.log('hitting opendash')
    socketFunction('dashboard')
    
    response.say("opening dashboard");
      response.shouldEndSession(false);
  }
);


alexaApp.intent("inventory", {
    "utterances": [
      "What are the Inventory Count", "Can you tell me inventory count", "Please tell me inventory count"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting inventory')
    //response.say("Opening Inventory Dashboard, You have 130 Cars, 157 Cross Overs and SUV, 121 Black Label, 70 Certified Pre Owned Vehicles");
    response.say("Here is the inventory count. You have 122 Cars, 52 Cross Overs and SUV, 34 Trucks, 45 Commercial Trucks, 142 Certified Pre Owned and 98 Pre Ownsed Vehciles");
    response.shouldEndSession(false);
  }
);

/*
alexaApp.intent("appointments", {
    "utterances": [
      "Tell me about Today's appoinments", "What are my appoinments for today", "What are the appoinments today"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting appointments')
 //   response.say("The number of appoinments for today are 3. Mr.John will be visiting at 10.30 pm,Mr.Cristopher will be at 12.00 pm and Mr.David at 2.00 pm ");
    response.say("The number of appoinments for today are 3. Upcoming appointment, Mr John will be visiting in 15 minutes, Mr Cristopher after 1 hour, and Mr David in 2 hours from now");
    response.shouldEndSession(false);
  }
);
*/


alexaApp.intent("sales", {
    "utterances": [
      "What is the sales report looking like?", "What is the sales report?", "How is the sales report?"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting sales')
    response.say(" Sales is 33%, which is pretty good.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("soldyes", {
    "utterances": [
      "Can you highlight how many cars have we sold yesterday", " How many cars we have sold yesterday", "how many cars sold yesterday"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting sales')
    response.say(" The number of cars sold yesterday are 2.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("soldweek", {
    "utterances": [
      "Can you tell how many cars have we sold this week", "How many cars have we sold for this week? ", "how many cars sold this week"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting sales')
    response.say(" The number of cars sold in this week are 10.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("soldmonth", {
    "utterances": [
      "Can you tell how many cars have we sold this month", "How many cars have we sold for this month? ", "how many cars sold this month"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting sales')
    response.say(" The number of cars sold in this month are 30.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("appointments", {
    "utterances": [
      "Tell me about Today's appoinments", "What are my appoinments for today", "What are the appoinments today"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting sales')
    response.say("You have a total of 5 appointments for the day. The first one is at 9:30AM 20 mins from now, with Mr. Nathan Jones, he is here to test drive Ford Mustang. The next is at 11:00AM with Mr. Bill Harris, 1:15PM with Mr. Glenn Johnson, 3:45PM with Mr. Vasudev Bhat and 4:45PM with Mr. Jim Spacy");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("ford", {
    "utterances": [
      "Highlight the number of F one fiftys", "How many F one fiftys are there?", "What are the number of F one fiftys we have"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting sales')
    response.say("The number of F one fiftys are 70.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("credit", {
    "utterances": [
      "How many credit applications are pending for processing?", "What are the number of credit applications pending?", "What number of credit applications are pending for processing?"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting sales')
    response.say("The number of pending credit applications for processing are 12.");
    response.shouldEndSession(false);
  }
);



alexaApp.intent("bye", {
    "utterances": [
      "good bye"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting bye')
    response.say("Bye, Have a great day");
    response.shouldEndSession(true);
  }
);
/*alexaApp.intent("thanks", {
    "utterances": [
      "thanks for the help", "thank you very much", "thanks a lot"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting mobile')
    response.say("You are welcome. Have a great day");
    response.shouldEndSession(false);
  }
);*/


    
/*alexaApp.intent("recomment", {
    "utterances": [
      "Yes Please tell", "Ok thats great", "please help me", "Ok Please tell"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting recomment')
    response.say("Shall I will give you a good recipe to surprise.");
    response.shouldEndSession(false);
  }
);*/


var socketFunction = function(commandname) {
//io.on('connection', function (socket) {
   try{ 
  S.emit('alexacommand',  commandname );  
   }catch(e)
       {
           
       }
//});
}


alexaApp.intent("defaultintent", {
    "utterances": [
      "can you give me tour plan", "give me another choice", "Not required", "no" , "say"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting default')
    response.say("Sorrry, I am not sure");
    response.shouldEndSession(false);
  }
);

alexaApp.messages.NO_INTENT_FOUND = "Sorry, something bad happened";

alexaApp.error = function(exception, request, response) {
    console.log('Coming to error', exception)
    var session = request.getSession();
  response.say("hmm");
    response.shouldEndSession(false);
};



server.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/test");