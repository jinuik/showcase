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

/*alexaApp.launch(function(request, response) {
  request.getSession();
  response.say("Welcome to Brillio Imagine IZone. I am Brillio AI Bot on Echo Dot");
  response.shouldEndSession(false);
});*/


alexaApp.launch(function(request, response) {
  request.getSession().set();
//  response.say("Welcome to ShowCase App. I am Hella, a Brillio AI Bot on Alexa Echo Dot.");
     response.say("Welcome to ShowCase Dashboard. How can I help you? ");
  response.shouldEndSession(false);
  response.shouldEndSession(false);
});

/*alexaApp.intent("tellme", function(request, response) {
  var session = request.getSession();
  response.say("The number is " + session.get("number"));
  // clear only the 'number' attribute from the session
  session.clear("number");
});

// the session variables can be entirely cleared, or cleared by key
alexaApp.intent("clear", function(request, response) {
  var session = request.getSession();
  session.clear(); // or: session.clear("key") to clear a single value
  response.say("Session cleared!");
});*/



/*alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

alexaApp.intent("nameIntent", {
    "slots": { "NAME": "LITERAL" },
    "utterances": [
      "my name is {names|NAME}", "set my name to {names|NAME}"
    ]
  },
  function(request, response) {
    console.log(request.data.request.intent);
    console.log('hitting this page')
    response.say("My name is Jinu");
  }
);*/

/*alexaApp.intent("interactIntent", {
    "slots": { "COMMANDNAME": "LITERAL" },
    "utterances": [
      "open {command|COMMANDNAME}", "can you open {command|COMMANDNAME}"
    ]
  },
  function(request, response) {
   // console.log(request.data.request.intent);
     socketFunction(request.data.request.intent)
    console.log('hitting this page')
    response.say("Ok Jinu.");
  }
);*/


/*alexaApp.intent("welcome", {
    "utterances": [
      "Hi", "Hello", "Hello hella", "Hi hella"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting welcome')
    response.say("Hi Stephen, How can I help you? ");
    response.shouldEndSession(false);
  }
);*/


alexaApp.intent("inventory", {
    "utterances": [
      "What are the Inventory Count", "Can you tell me inventory count", "Please tell me inventory count"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting inventory')
    //response.say("Opening Inventory Dashboard, You have 130 Cars, 157 Cross Overs and SUV, 121 Black Label, 70 Certified Pre Owned Vehicles");
    response.say("Here is the inventory count. You have 130 Cars, 157 Cross Overs and SUV, 121 Black Label and 70 Certified Pre Owned Vehicles");
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
    response.say("The number of appointments for today are 5.");
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
    response.say("The number of F 150s are 70.");
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
    console.log('Coming to error')
    var session = request.getSession();
  response.say("Sorry, something bad happened");
    response.shouldEndSession(true);
};

var socketFunction = function(commandname) {
//io.on('connection', function (socket) {
    
  S.emit('alexacommand',  commandname );  
//});
}

server.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/test");