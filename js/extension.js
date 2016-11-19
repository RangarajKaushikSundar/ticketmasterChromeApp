window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    console.log(startPos.coords.latitude);
    console.log(startPos.coords.longitude);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('loginButton');
  checkPageButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
	    var username = document.getElementById('userName').value;
		document.getElementById('loginDiv').style.display= "none";
		document.getElementById('homeDiv').style.display= "block";
		document.getElementById('namePlaceholder').innerHTML = username;
		var content = document.getElementById('contents');
		var events = [];
		if(username === "anusha") {
			events = [{"artist":"The Goo Goo Dolls", "location":"Nov 19"},{"artist":"Hot Tuna","location":"Nov 21"}];
		}
		if (events.length > 0){
			var eventHeading= document.createElement('div');
			eventHeading.setAttribute('class','eventHeading');
			eventHeading.innerHTML="Upcoming Events";
			content.appendChild(eventHeading);
			for (var i=0; i< events.length; i++) {
				var eventDiv = document.createElement('div');
				eventDiv.setAttribute('class','eventsDiv')

				var artist = document.createElement('div');
				artist.setAttribute('class','evArtist');
				artist.innerHTML = events[i].artist;

				var location = document.createElement('div');
				location.setAttribute('class','evLocation');
				location.innerHTML = events[i].location;
				
				eventDiv.appendChild(artist);
				eventDiv.appendChild(location);
				content.appendChild(eventDiv);
			}
		} else {
			document.getElementById('contentMsg').innerHTML = "Sorry, There are no upcoming events";
			document.getElementById('recommendations').style.display= "none";
		}
    });
  }, false);
}, false);