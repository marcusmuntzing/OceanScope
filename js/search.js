
 import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js';

async function getAddressFromCoordinates(lat, lon) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyBCftQkQvQgkkfh1GTULqlOVOTHdXLLrNQ`);
  const data = await response.json();
  if (data.results.length > 0) {
    return data.results[0].formatted_address;
  } else {
    return null;
  }
}

// Function to display the graph
function displayGraph(data) {
  const timestamps = data.map((item) => item.timestamp);
  const temperatures = data.map((item) => item.temp);


  const ctx = document.getElementById('graphContainer').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: timestamps,
      datasets: [
        {
          label: 'Water Temperature',
          data: temperatures,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'timeseries',
          time: {
            unit: 'day',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Temperature (°C)',
          },
        },
      },
    },
  });
}

// Function to search for the address
// Function to search for the address
function searchAddress() {
  const searchInput = document.getElementById('search-input').value;
  const address = searchInput.trim().toLowerCase();
  const graphContainer = document.getElementById('graphContainer');
  const noDataContainer = document.getElementById('noDataContainer');

  // Check if the address is a string
  if (typeof address !== 'string') {
    console.error('Invalid address format');
    return;
  }

  // Fetch data from backend API
  fetch('https://www.oceanscope.se/data')
    .then((response) => response.json())
    .then(async (data) => {
      const matchingData = [];
      await Promise.all(
        data.map(async (item) => {
          const itemAddress = await getAddressFromCoordinates(item.location[0], item.location[1]);
          if (itemAddress && itemAddress.trim().toLowerCase().includes(address)) {
            matchingData.push(item);
          }
        })
      );

      // Display the graph if matching data is found
      if (matchingData.length > 0) {
        displayGraph(matchingData);
        graphContainer.style.display = 'block'; // Show the canvas
        noDataContainer.style.display = 'none'; // Hide the alternative content
      } else {
        console.log('No matching data found');
        graphContainer.style.display = 'none'; // Hide the canvas
        noDataContainer.style.display = 'flex'; // Show the alternative content
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


// Event listener for search form submission
document.getElementById('addressForm').addEventListener('submit', (e) => {
  e.preventDefault();
  searchAddress();
});





