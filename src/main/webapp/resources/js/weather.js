	function prepareAndShowWeatherEntryPopup(event,geocoder,map) {
		geocodeLatLng(geocoder, map, event);
	}

	function hideWeatherEntryPopup(){
		["latitude","longitude","elevation","location","temperature","pressure","humidity","datepicker","spinner"].forEach(function(val){ document.getElementById(val).value = ""});		
		document.getElementById('weatherentry').style.display = "none";
		document.getElementById('floating-panel').style.display = "block";
		}
	
	function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
		  });
		google.maps.event.addListener(map, 'click', function( event ){
			prepareAndShowWeatherEntryPopup(event,geocoder,map);
		});

	}
	  function geocodeLatLng(geocoder, map, event) {
		geocoder.geocode({'location': event.latLng}, function(results, status) {
		  if (status === 'OK') {
			if (results[1]) {
				getLocationElevation(event, results[1].formatted_address);
			} else {
			  window.alert('No results found');
			}
		  } else {
			window.alert('Geocoder failed due to: ' + status);
		  }
		});
	  }
	 
	function showWeatherEntryPopup(event,elevation,location) {
		document.getElementById("latitude").value = event.latLng.lat();
		document.getElementById("longitude").value = event.latLng.lng();
		document.getElementById("elevation").value = elevation;
		document.getElementById("location").value = location;
		document.getElementById('weatherentry').style.display = "block";
		document.getElementById('floating-panel').style.display = "none";
	}
	 
	function getLocationElevation(event, location) {
		var elevator = new google.maps.ElevationService;
        // Initiate the location request
        elevator.getElevationForLocations({
          'locations': [event.latLng]
        }, function(results, status) {
          if (status === 'OK') {
            // Retrieve the first result
            if (results[0]) {
				showWeatherEntryPopup(event,results[0].elevation,location);
            } else {
              alert('No elevation details found');
            }
          } else {
            alert('Elevation service failed due to: ' + status);
          }
        });
	}
	
    function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

	  //Ajax
	var request;  
	function sendInfo()  {  
		var lat=document.getElementById("latitude").value;  
		var lon=document.getElementById("longitude").value;  
		var ele=document.getElementById("elevation").value;  
		var loc=document.getElementById("location").value;  

		var tem=document.getElementById("temperature").value;  
		var pre=document.getElementById("pressure").value;  
		var hum=document.getElementById("humidity").value;  
		var dat=document.getElementById('datepicker').value;
		var tim=document.getElementById('spinner').value;
		
		if (ele == "" ||  dat == "" || tim == "" || tem == "" || pre == "" || hum == "") {
			alert("Fill all values!");
			return;
		} 
		if (isNaN(ele) || isNaN(tem) || isNaN(pre) || isNaN(hum)) {
			alert("Invalid value!");
			return;
		} 

		if (tem > 60 || tem < -100) {
			alert("Temperature may be entered as a value between +60 and -100!");
			return;
		} 

		if (ele > 8850 || ele < 0) {
			alert("The elevation is to be between 0 and 8850!");
			return;
		} 
		if (hum > 100 || hum < 0) {
			alert("Invalid humidity!");
			return;
		} 		
		var d = new Date(dat);
		var dy= d.getDate();
		var mo = d.getMonth() + 1;
		var yr= d.getFullYear();
		var url="WeatherEntry?lat="+lat+"&lon="+lon+"&ele="+ele+"&loc="+loc+"&tem="+tem+"&pre="+pre+"&hum="+hum+"&dat="+ yr+"-"+mo+"-"+dy+"&tim="+tim;  
		if(window.XMLHttpRequest){  
			request=new XMLHttpRequest();  
		} else if(window.ActiveXObject){  
			request=new ActiveXObject("Microsoft.XMLHTTP");  
		}  
		hideWeatherEntryPopup();

		try {  
			request.onreadystatechange=getInfo;  
			request.open("GET",url,true);  
			request.send();  
		}  catch(e){  
			alert("Unable to connect to server");  
		}  
	}  
	  
	function getInfo(){  
		if(request.readyState==4){  
			var val=request.responseText;  
			document.getElementById('result').innerHTML=val;  
		}  
	}  	  

	  $( function() {
		$( "#datepicker" ).datepicker();
	  } );


	$( function() {
	$.widget( "ui.timespinner", $.ui.spinner, {
	  options: {
		// seconds
		step: 60 * 1000,
		// hours
		page: 60
	  },
 
	  _parse: function( value ) {
		if ( typeof value === "string" ) {
		  // already a timestamp
		  if ( Number( value ) == value ) {
			return Number( value );
		  }
		  return +Globalize.parseDate( value );
		}
		return value;
	  },
 
	  _format: function( value ) {
		return Globalize.format( new Date(value), "t" );
	  }
	});
 
	$( "#spinner" ).timespinner();
 
	$( "#culture" ).on( "change", function() {
	  var current = $( "#spinner" ).timespinner( "value" );
	  Globalize.culture( $(this).val() );
	  $( "#spinner" ).timespinner( "value", current );
	});
  } );
