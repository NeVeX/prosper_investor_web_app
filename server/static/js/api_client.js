$( document ).ready(function() {
    console.log( "page is ready in js" );
    getProsperAccount();
});


//$("button").click(getProsperAccount);


function getProsperAccount() {
    
	$.ajax({
		type: "GET",  
		url: "http://localhost:8081/account",
		xhrFields: {
    	  withCredentials: true
   		},	
        // port: 8081,
		success: function(data) {
			$("#available_cash_balance").text("$"+data.available_cash_balance);
			$("#total_account_value").text("$"+data.total_account_value);
			$("#total_active_investments").text("$"+data.total_amount_invested_on_active_notes);
		},
		error: function(error) {
			$("#available_cash_balance").text("Error");
        }
	})	
}