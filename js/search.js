
// Function to retrieve address from coordinates in the frontend
async function getAddressFromCoordinates(lat, lon) {
  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBCftQkQvQgkkfh1GTULqlOVOTHdXLLrNQ');
  const data = await response.json();
  if (data.results.length > 0) {
    console.log(data.results[0].formatted_address)
    return data.results[0].formatted_address;
  } else {
    return null;
  }
}

// Function to display the graph
function displayGraph(data) {
  const timestamps = data.map((item) => item.timestamp);
  const temperatures = data.map((item) => item.temp);

  // Use a graph library like Chart.js to create the graph
  // Here's a basic example using Chart.js

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
function searchAddress() {
  const addressInput = document.getElementById('addressInput');
  const searchAddress = addressInput.value.trim();

  // Fetch data from backend API
  fetch('https://oyster-app-x8o8q.ondigitalocean.app/data')
    .then((response) => response.json())
    .then((data) => {
      const matchingData = data.filter((item) => {
        const address = getAddressFromCoordinates(item.location[0], item.location[1]);
        return address && address.toLowerCase().includes(searchAddress.toLowerCase());
      });

      // Display the graph if matching data is found
      if (matchingData.length > 0) {
        displayGraph(matchingData);
      } else {
        console.log('No matching data found');
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
