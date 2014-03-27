//login & signup form handling

$("#register").submit(function() {
	if ($("#password1").val() != $("#password2").val()) {
		// give focus to pw field
		$("#password1").val('');
		$("#password2").val('');
    	$('#password1').focus();
    	//should probably create a more formal error...
		console.info("passwords do NOT match, try again");
	}
	else {
		//passwords match
		console.info("passwords match");//clear fields
		if (!pwCriteria($("#password1").val())) {
			//error - password does not meet criteria
		} else {
			//ALLOW SUBMISSION TO DATABASE IF IT MEETS CRITERIA EXACTLY
		}
	}
});

function pwCriteria(pw) {
	var string_length = 8;
	var digit = "0123456789";
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	//parse password; check if meets specified criteria
	for (var i=0; i<string_length; i++) {
		//
		// if (pw.contains() ) {}
	}
}

//once user info has been added to database -- needs to redirect to index.html