// write code for distinguishing between student user & intstructor user
// 

// Foundation.utils.random_str(6);

// var selected_file = $('#input').get(0).files[0];

$("#course-name").click(function() { //anonymous function 
  console.log(Foundation.utils.random_str(1));
});

/*
var request;
if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
} else {
	request = new ActiveXObject("Microsoft.XMLHTTP");
}
request.open('GET', 'data.txt');
request.onreadystatechange = function() {
	if ((request.readyState===4) && (request.status===200)) {
		console.log(request);
		// document.writeln(request.responseText);
		var modify = document.getElementById("course-name");
		modify.innerHTML =request.responseText;
	}
}
request.send();
*/