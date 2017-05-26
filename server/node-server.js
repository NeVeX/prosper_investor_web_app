
var express = require('express');
var path = require('path');
var httpClient = require('request');
var session = require('client-sessions');

var app = express();
app.use(express.json());
// app.use(express.static('static'));
app.use(express.static(path.join(__dirname, 'static'))); 
app.use(session({
  cookieName: 'session',
  secret: 'THIS_SHOULD_BE_A_SECURE_RANDOM_STRING_BUT_YA_KNOW_LOL',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
//    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
//    res.header('Access-Control-Allow-Credentials', 'true');

   
   next();
});

// app.get('/persons/:name', function(req, res) {

//     var personName = req.params.name;
//     console.log("Request for name: "+personName);
//     res.setHeader("Content-Type", "application/json")
//     res.send("Hello "+personName+"!");
// });

var portNumber = 8081;
app.listen(portNumber);

console.log('Listening on port '+portNumber+'...');

app.post('/login', function(req, res) {
    // res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    var email = req.body.email;
    var password = req.body.password;
    
    if ( email && password) {
        console.log("Received login request for email "+email+ " and password with length "+password.length);
        // try {
            getAccessToken(email, password, function(token) {
                if ( token ) {
                    console.log("Got new token "+token+" for email " +email);
                    req.session.access_token = token;
                    res.send();
                } else {
                    res.json(401, { error: "Bad credentials"});
                }
            });
            // });
        // } catch (error) {
            // res.json(422, { error: "Bad credentials"});
        // }
    } else {
        console.log("No email/password provided")
        res.json(422, { error: "Please provide credentials"});
    }
});

app.get('/account', function(req, res) {
    
    // res.header('Access-Control-Allow-Origin', "*");
    // res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    
    if ( req.session && req.session.access_token) {
        var accessToken = req.session.access_token;
        // try {
            
            // var access_token = getAccessToken(getProsperAccount);
        getProsperAccount(accessToken, function(data) {
            
             if( data ) {
                var accountData = JSON.parse(data);
                console.log("returning account balance: "+accountData.total_account_value);
                res.json({
                    total_account_value: accountData.total_account_value,
                    available_cash_balance: accountData.available_cash_balance,
                    total_amount_invested_on_active_notes: accountData.total_amount_invested_on_active_notes
                });
            } else {
                // } catch(error) {
                res.json(500, {error: "Could not get account balance"});
            }
        });
        
       
        // }
    } else {
        console.log("No auth information");
        res.send(401);
    }

    
});


// var cachedToken;
// var cachedTokenMs;

function getAccessToken(email, password, successFunction) {

    // if ( cachedToken != null && new Date().getMilliseconds() - cachedTokenMs <= 3000000 )
    // {
    //     successFunction(cachedToken);
    // }
    httpClient(
        { 
            method: 'POST',
            url: 'https://api.prosper.com/v1/security/oauth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // NEED TO ENCODE THE BELOW
            body: 'grant_type=password&client_id=&client_secret=&username='+email+'&password='+password,
        }
        , function (error, response, body) {
            
            console.log('oauth error: ', error);
            console.log('oauth body: ', body);
            // console.log('oauth response: ', response);

            if ( error ) {
                console.log('account occured:', error);
                successFunction(null);
                // throw new Error("access token retrieval error");
            } else {
                var token = JSON.parse(body).access_token;
                // if ( token ) {
                    // cachedToken = token;
                    // cachedTokenMs = new Date().getTime();
                    successFunction(token);
                // } else {

                    // throw new Error("No token could be extracted from the response");
                // }
            }
        }
    )
}

function getProsperAccount(bearertoken, callback) {
    httpClient(
    { 
        method: 'GET',
        url: 'https://api.prosper.com/v1/accounts/prosper/',
        headers: {
            'Authorization': 'bearer ' + bearertoken
        },
    }, function (error, response, body) {
        if ( error ) {
            console.log('account error occured:', error);
            // throw new Error("account retrieval error")
            callback(null);
        } else {
            console.log("Recieved account info: "+body);
            callback(body);
        }
    });
}

