const key = require('./google_key.js');
function initMap(){
  // map options
  const options = {
    zoom: 10,
    center: { lat: 37.7749, lng: -122.4194 }
  }
  // new map
  const map = new google.maps.Map(document.getElementById('map'), options);

  // Listen for click on map
  google.maps.event.addListener(map, 'click', function(e){
    addMarker({coords: e.latLng});
    console.log(e);
  });
  /*
  // add marker
  const marker = new google.maps.Marker({
    position: { lat: 37.7989, lng: -122.4662 },
    map: map,
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  });

  const infoWindow = new google.maps.InfoWindow({
    content: '<h1>Presidio of San Francisco</h1>'
  });
  
  marker.addListener('click', function(){
    infoWindow.open(map, marker);
  });
*/

// Array of markers
let markers = [
  {
    coords: {lat: 37.7989, lng: -122.4662 },
    iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content: '<h1>San Francisco, CA</h1>'
  },
  {
    coords: {lat: 34.0522, lng: -118.2437},
    content: '<h1>Los Angeles, CA</h1>'
  },
  {
    coords: {lat: 37.8044, lng: -122.2711 },
    content: "<h1>Oakland, CA<h1>"
  }
]

for (let i = 0; i < markers.length; i++) {
  // Add Markers
  addMarker(markers[i]);
}

// Add marker function
function addMarker(props){
  const marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: props.iconImage
  });

  // check for custom icon
  if(props.iconImage){
    // set icon image
    marker.setIcon(props.iconImage);
  }

  // Check content
  if (props.content) {
    const infoWindow = new google.maps.InfoWindow({
      content: props.content
    });
    
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }
  }
}