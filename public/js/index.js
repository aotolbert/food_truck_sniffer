var truckOBJs = [];
let servicesOBJ = {};
let dataPointsLocationOBJ = {};
let dataPointsServicesOBJ = {};
let servicesID;

// \/\/\/ Used for labeling the markers on map \/\/\/ 
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
var labelIndex = 0;

var gmarkers = [];
var infowindow = new google.maps.InfoWindow();

var locationSource = $("#location-template").html();
var locTemplate = Handlebars.compile(locationSource);
console.log("Location Source: ", locationSource)

var serviceSource = $("#services-template").html();
var serviceTemplate = Handlebars.compile(serviceSource);

function initialize() {
  var center = new google.maps.LatLng(33.4483771, -112.07403729999999);
  var mapOptions = {
    zoom: 15,
    center: { lat: 35.22, lng: -80.84 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: mapStyle
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var geocoder = new google.maps.Geocoder();
  //populates truckOBJs array with addresses from the database.
  $.ajax("/api/trucks/", {
    type: "GET",
  }).then(
    function (response) {
      for (let i = 0; i < response.length; i++) {
        let newOBJ = response[i];
        console.log("Object being added to truckOBJs: ", newOBJ);
        truckOBJs.push(newOBJ);
      }
      geocodeAddress(geocoder, map);
    }
  );

}
function geocodeAddress(geocoder, resultsMap) {
  for (let i = 0; i < truckOBJs.length; i++) {
    geocoder.geocode({ 'address': truckOBJs[i].address }, function (results, status) {
      resultsMap.setZoom(13);
      longitude = results[0].geometry.viewport.getCenter().lng();
      //console.log(longitude);

      latitude = results[0].geometry.viewport.getCenter().lat();
      var latLong = "" + latitude + " , " + longitude + "";
      servicesID = truckOBJs[i].id;
      servicesOBJ = truckOBJs[i];

      locationData = { name: truckOBJs[i].name }
      dataPointsLocationOBJ = {
        ID: servicesID,
        type: "Main",
        latLong: latLong,
        truckOBJ: truckOBJs[i],
        taxonomy: {
          locations: [
            '123-432-234',
            '4324-234324-2432'
          ],
          services: [
            servicesID,
            // '222-222-222'
          ]
        }
      };
      dataPointsServicesOBJ = {
        latLong: latLong,
        taxonomy: truckOBJs[i].id
      };

      mapData.key.serviceData.services[servicesID] = servicesOBJ;
      mapData.key.locationData.locations[servicesID] = locationData;
      mapData.dataPoints.services[servicesID] = dataPointsServicesOBJ;
      mapData.dataPoints.locations.push(dataPointsLocationOBJ);
      console.log("MAP DATA OBJ: ", mapData);




      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
      }
      // var marker = new google.maps.Marker({
      // map: resultsMap,
      //  zoom: 10,
      // position: results[0].geometry.location,
      //  label: labels[labelIndex++ % labels.length],
      //  animation: google.maps.Animation.DROP,
      //  customInfo: "Marker " + v,

      // });
      for (i = 0; i < mapData.dataPoints.locations.length; i++) {
        addMarker(mapData.dataPoints.locations[i]);
      };
    })
  }
};

function addMarker(marker) {
  var location = getLocation(marker);
  if (location) {
    var category = marker.type
    var title = location.name;
    var latLong = marker.latLong.split(',');
    var pos = new google.maps.LatLng(latLong[0], latLong[1]);
    var content = getLocationContent(location);

    $.extend(location, marker)

    mapMarker = new google.maps.Marker({
      title: title,
      position: pos,
      category: category,
      locationData: location,
      map: map
    });

    gmarkers.push(mapMarker);

    // Marker click listener
    google.maps.event.addListener(mapMarker, 'click', (function (mapMarker, content) {
      return function () {
        console.log("You clicked me: ", mapMarker.locationData.truckOBJ.twitterId, "=================");
        // infowindow.setContent(content);
        // infowindow.open(map, mapMarker);
        //map.panTo(this.getPosition());
        generateRelated(mapMarker);
        $('#scrolly').removeAttr('style');

      }
    })(mapMarker, content));
  }
}

function getLocation(marker) {
  var location = false;
  if (mapData.key.locationData.locations[marker.ID]) {
    location = mapData.key.locationData.locations[marker.ID];
  }
  return location;
}

function getLocationContent(location) {
  console.log("get location content: ", location)
  return locTemplate(location);
}

function generateRelated(marker) {
  $('#output').text('');
  $('#output').html(generateServices(marker));
}

function generateServices(location) {
  console.log("generateServices: ", location)
  var serviceCards = [];

  for (var x in location.locationData.taxonomy.services) {
    var serviceID = location.locationData.taxonomy.services[x];
    serviceCards.push(serviceTemplate(mapData.key.serviceData.services[serviceID]));
    console.log("sent this to template", mapData.key.serviceData.services[serviceID]);

  }
  return serviceCards.join('')
}

function twitterEmbed(truckTwitterName) {
  var tweetDiv = $("#twitterDisplay");
  var embedElement = `<a class="twitter-timeline" data-tweet-limit="2" data-height="300" href="https://twitter.com/${truckTwitterName}"></a>`
  $("#twitterDisplay").append(embedElement);
};

initialize();