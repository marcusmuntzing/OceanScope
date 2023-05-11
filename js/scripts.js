const APILINK = "http://localhost:8000"


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


function requestData() {
  fetch('/data')
    .then(function(response) {
      return response.json();
    })
    .then(initMap);
}


function initMap(json) {
  var gothenburg = new google.maps.LatLng(57.708870, 11.974560);


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: gothenburg,
  });

  var data = [];
  var i;

    for (let i = 0; i < json.length; i++) {
      const latLng = new google.maps.LatLng(json[i].location[0], json[i].location[1]);
      const temperature = json[i].temp;
      const markerData = {
        "location": latLng,
        "weight": temperature
      };
      data.push(markerData);
    }

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: data,
    map: map,
  });

}








