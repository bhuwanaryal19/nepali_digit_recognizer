
	   var mousePressed = false;
	   var lastX, lastY;
	   var ctx;
	   var csrftoken = $('meta[name=csrf-token]').attr('content')
	   $.ajaxSetup({
		   beforeSend: function(xhr, settings) {
			   if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
				   xhr.setRequestHeader("X-CSRFToken", csrftoken)
			   }
		   }
	   })
	   function init() {
		   canvas = document.getElementById('myCanvas')
		   ctx = canvas.getContext("2d");
		   ctx.fillStyle = 'black';
		   ctx.fillRect(0, 0, canvas.width, canvas.height);
		   $('#myCanvas').mousedown(function (e) {
			   mousePressed = true;
			   Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
		   });
		   $('#myCanvas').mousemove(function (e) {
			   if (mousePressed) {
				   Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
			   }
		   });
		   $('#myCanvas').mouseup(function (e) {
			   mousePressed = false;
		   });
			   $('#myCanvas').mouseleave(function (e) {
			   mousePressed = false;
		   });
	   }
	   function Draw(x, y, isDown) {
		   if (isDown) {
			   ctx.beginPath();
			   ctx.strokeStyle = 'white';
			   ctx.lineWidth = '10';
			   ctx.lineJoin = "round";
			   ctx.moveTo(lastX, lastY);
			   ctx.lineTo(x, y);
			   ctx.closePath();
			   ctx.stroke();
		   }
		   lastX = x; lastY = y;
	   }
		   
	   function clearArea() {
		   // Use the identity matrix while clearing the canvas
		   ctx.setTransform(1, 0, 0, 1, 0, 0);
		   ctx.fillStyle = 'black';
		   ctx.fillRect(0, 0, canvas.width, canvas.height);
		   document.getElementById("result").style.display = "none"
	   }
		
	   function save() {
		   document.getElementById("canvasimg").style.border = "2px solid";
		   var dataURL = canvas.toDataURL();
		   document.getElementById("canvasimg").src = dataURL;
		   document.getElementById("canvasimg").style.display = "inline";
	   }
	   function UploadPic() {
		   // Generate the image data
		   var Pic = document.getElementById("myCanvas").toDataURL("image/png");
		   Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "")
		   // Sending the image data to Server
		   $.ajax({
			   type: 'POST',
			   url: '/charrecognize',
			   data: JSON.stringify({ image : Pic }),
			   contentType: 'application/json;charset=UTF-8',
			   dataType: 'json',
			   success: function(msg,status, jqXHR){
					 var a = JSON.parse(jqXHR.responseText);
					 var prediction = a.prediction;
					 var prob = msg.probability
					 
					 document.getElementById("pred").innerHTML = prediction
					 document.getElementById("prob").innerHTML = prob
					 document.getElementById("result").style.display = "inline"

			   }
		   });
	   }