// Function to fetch cryptocurrency price from CoinGecko API
function getCryptoPrice() {
      const crypto = document.getElementById('crypto').value;
      const resultDiv = document.getElementById('result');
      const errorMessage = document.getElementById('error-message');
  
      resultDiv.style.display = 'none'; // Hide previous results
      errorMessage.innerHTML = '';      // Clear previous error messages
  
      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
  
      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch data.');
              }
              return response.json();
          })
          .then(data => {
              if (!data[crypto]) {
                  throw new Error('Cryptocurrency not found.');
              }
              displayCryptoData(data[crypto], crypto);
          })
          .catch(error => {
              errorMessage.innerHTML = error.message;
          });
  }
  
  // Function to display fetched data in the UI
  function displayCryptoData(data, crypto) {
      document.getElementById('crypto-name').innerHTML = crypto.charAt(0).toUpperCase() + crypto.slice(1);
      document.getElementById('crypto-price').innerHTML = data.usd.toLocaleString();
      document.getElementById('crypto-market-cap').innerHTML = data.usd_market_cap ? data.usd_market_cap.toLocaleString() : "N/A";
      document.getElementById('crypto-change').innerHTML = data.usd_24h_change.toFixed(2);
      
      document.getElementById('result').style.display = 'block'; // Show the result section
  }
  