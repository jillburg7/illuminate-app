$(document).ready(function() {
  $('#searchip').change(function() {
    $.ajax({
      type: 'GET',
      url: "getip.php",
      data: 'ip=' + $('#searchip').val(),
      success: function (msg) {
        $('#resultip').html(msg);
      }
    });
  });
}); //document.ready