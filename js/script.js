//login & signup form handling

$("#register").submit(function() {
	if ($("#password1").val() != $("#password2").val()) {
		 & give focus to pw field
		$("#password1").val('');
		$("#password2").val('');
    	$('#password1').focus();
    	//should probably create a more formal error...
		console.info("passwords do NOT match, try again");
	}
	else {
		//passwords match
		console.info("passwords match");//clear fields
		var pw = $("#password1").val();
		var digit = "0123456789";
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		// if (pw.contains() ) {}
	}
});

