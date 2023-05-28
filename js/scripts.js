
/*======== Scroll Animations =============*/


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});


const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add("show1");
        } else {
            entry.target.classList.remove("show1");
        }
    });
});


const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));




const hiddenElements1 = document.querySelectorAll(".hidden1");
hiddenElements1.forEach((el) => observer1.observe(el));




/*======== Sticky Navbar =============*/

window.onscroll = () => {
let header = document.querySelector(".header");
header.classList.toggle("sticky", window.scrollY > 50);
}

/*======== Responsive Navbar =============*/

const navbarLinks = document.querySelectorAll('.navbar a');

navbarLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');
    window.location.href = href;
  });
});



/*======== Colored when Active Navbar =============*/

const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Remove 'active' class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add 'active' class to clicked link
    this.classList.add('active');
  });
});


/*======== Google Heatmaps =============*/

function initMap() {
  var gothenburg = new google.maps.LatLng(57.708870, 11.974560);

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: gothenburg,
  });

  fetch('https://www.oceanscope.se/data').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(results => {
    console.log(results)
    var data = [];
    for (let i = 0; i < results.length; i++) {
      const latLng = new google.maps.LatLng(results[i].location[0], results[i].location[1]);
      const temperature = results[i].temp;
      const markerData = {
        "location": latLng,
        "weight": temperature
      };
      data.push(markerData);
    }

    var gradientColors = [
      'rgba(128, 0, 128, 0)', // starting color (transparent purple)
      'rgba(128, 0, 128, 1)'  // ending color (solid purple)
    ];

    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: data,
      map: map,
      gradient: gradientColors, // set the custom gradient
    });

    // Add event listener for click event on the heatmap
    google.maps.event.addListener(heatmap, 'click', function(event) {
      var location = event.latLng;
      var temperature = event.weight;

      // Display the data to the user
      displayData(location, temperature);
    });

  }).catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function displayData(location, temperature) {
  // Get the target div where the data will be displayed
  var targetDiv = document.getElementById('data-container');

  // Create HTML content for the location and temperature
  var locationText = document.createElement('p');
  locationText.textContent = 'Location: ' + location;

  var temperatureText = document.createElement('p');
  temperatureText.textContent = 'Temperature: ' + temperature;

  // Clear previous content in the target div
  targetDiv.innerHTML = '';

  // Append the HTML content to the target div
  targetDiv.appendChild(locationText);
  targetDiv.appendChild(temperatureText);
}

document.addEventListener('DOMContentLoaded', function() {
  initMap();
});




document.addEventListener('DOMContentLoaded', function() {
  initMap();
});




