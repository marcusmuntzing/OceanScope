// Load the data from your JSON file
$.getJSON('data.json', function(data) {
  // Create an empty array to store the heatmap data
  var heatmapData = [];

  // Loop through the data and add each data point to the heatmapData array
  for (var i = 0; i < data.length; i++) {
    var point = data[i];
    var latLng = new google.maps.LatLng(point.location[0], point.location[1]);
    var temperature = point.temp;
    heatmapData.push({location: latLng, weight: temperature});
  }

  // Create a heatmap layer and set its data to the heatmapData array
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData
  });

  // Add the heatmap layer to the map
  heatmap.setMap(map);
});


// Initialize the Google Maps API and create a map object
var map = new google.maps.Map(document.getElementById('map'), {
  center: new google.maps.LatLng(0, 0),
  zoom: 2,
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

// Create a heatmap layer and add it to the map object
var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData,
  map: map,
  radius: 20,
  opacity: 0.7
});
