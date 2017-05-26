

$(document).ready(function() {
    
    $("#loginButton").click(loginButtonClicked);
});

function loginButtonClicked(event) {
    event.preventDefault(); // stop page reload

    console.log('login button clicked');

    var email = $("#email").val();
    var password = $("#password").val();

    console.log("Email: "+email);

    var jsonBody = JSON.stringify({ email: email, password: password});

	$.ajax({
		type: "POST",  
		url: "http://localhost:8081/login",
        data: jsonBody,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            "Content-Type": "application/json"
        },
		success: function(data) {
            console.log("Got logged in: "+data);
            window.location.href = "account.html"; 
		},
		error: function(error) {
            console.log("error occured while trying to log in : "+error)
        }
	})	

}