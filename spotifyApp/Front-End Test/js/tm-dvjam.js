function createCards(c_name, c_image, c_desc) {
	// Content
	var contentDiv = document.getElementById('content');
	var cardDiv = document.createElement('div');
	cardDiv.setAttribute('class','card');
	
	// Inside each card have the following components
	// Image
	var imageDiv = document.createElement('div');
	imageDiv.style.cssText = "background-image: url("+c_image+");border-top-left-radius:10px;border-top-right-radius:10px;";
	imageDiv.setAttribute('class','imageDiv');
	
	// Topic
	var topicDiv = document.createElement('div');
	var topicHeading = document.createElement('p');
	topicHeading.innerHTML = c_name;
	topicHeading.setAttribute('title',c_name);
	topicHeading.setAttribute('class','topicHeading');
	var imageName = document.createElement('p');
	imageName.innerHTML = c_name;
	imageName.setAttribute('class','imageName');
	topicDiv.appendChild(topicHeading);
	topicDiv.appendChild(imageName);
	topicDiv.setAttribute('class','topicDiv');
	
	// Description
	var descDiv = document.createElement('a');
	descDiv.setAttribute('href', c_desc);
	descDiv.innerHTML = "Event Link";
	
	// Append all these to the card
	cardDiv.appendChild(imageDiv);
	cardDiv.appendChild(topicDiv);
	cardDiv.appendChild(descDiv);
	// Append card to the content div
	contentDiv.appendChild(cardDiv);
}	

var attrID = []

function getAttractionID (name) {
	$.ajax({
     url: "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=b5QXdGX3u4sBYmEG4VHMhmcn8Axj0Vyp&keyword=" + name,
     type: "GET",
     async: false,
     success: function(result) {
     	result._embedded.attractions.map(function(val){
     		attrID.push(val.id)
     	})
	 }
    });
}

function getEvents (attrID) {
	$.ajax({
     url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=b5QXdGX3u4sBYmEG4VHMhmcn8Axj0Vyp&attractionId="+attrID+"&startDateTime=2016-11-19T14:33:00Z&endDateTime=2017-02-19T14:33:00Z&city=New%20York",
     type: "GET",
     async: false,
     success: function(result) {
     	 result._embedded.events.map(function (val) {
     	 	var c_name = val.name;
     	 	var c_image = val.images[2].url;
     	 	var c_desc = val.url;
     	 	createCards(c_name,c_image,c_desc);
     	 })
	 }
    });
}

function getData(isSorted) {
	var result1 = [];
	var resStr = "";
	$.ajax({
         url: "https://api.spotify.com/v1/me/following?type=artist&limit=20",
         type: "GET",
         dataType: 'json',
         async: false,
         beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer BQCIrz93Fqdu2OLhcwPFifCSACMdJ7CazIyUD8yLw7jchOBqURC7cAKUMc3d6uAei6_zZZat7N8Gtw-Sni_4yIwhqe1P_Flp_TaRboY1W-ULkMDBPbLTA9LBswNgqrNl-ELDBn38C-I7Jy1ZXIUMKEuD18JIU380WnFJ5rG763OR8Q5d1P97t01uaF2VSa5pCU4Q0HiY5STgjJnKtBOUIxlcyBmJIRZstmAYBcUauaOtIrNyTVlTyMnfH8HfnKqy3sTh66xvLILkbXE3C9X7bhJ7l143U8ka2vPzJwuEqP6P_fRKPS1x');},
         success: function(result) { 
         	var ObjUl = $('.custom-nav')[0];
			result.artists.items.map(function(val){
					var Objli = $('<li></li>');
	                var Obja = $('<a></a>');
	                Obja.attr("tabindex", "-1");
	                Obja.text(val.name);
	                result1.push(val.name);
	                Objli.append(Obja[0]);
	                ObjUl.append(Objli[0]);
	                getAttractionID(val.name);
		 			resStr = attrID.join(',')
		 	})
		 }
      });
	getEvents(resStr)
}

getData();