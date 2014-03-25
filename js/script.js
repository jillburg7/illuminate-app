//login & signup form handling

$("#register").click(function() {
	if ($("#password1").val() === $("#password2").val()) {
		//passwords match
		console.info("passwords match");
	}
	else {
		//clear fields & give focus to pw field
		$("#password1").val('');
		$("#password2").val('');
    	$('#password1').focus();
    	//should probably create a more formal error...
		console.info("passwords do NOT match, try again");
	}
});