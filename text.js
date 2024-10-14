/*import fetch from 'node-fetch';
import querystring from 'querystring';  // Import querystring

// Function to make the POST request to the device list endpoint
async function getDeviceList() {
  const apiEndpoint = 'https://api.closeguardtechnology.com/v1/396slbHG7506Rlglhglbfj7/devicelist';

  try {

    const requestData = querystring.stringify({
      device_imei: '865205035850840'  // Your device IMEI 
    });

    console.log(requestData)
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Api-Token': '3853925hxnsvdebdyh36s',      // Add your API token here
        'Request-Id': '12345678',                 // Add your request ID here
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestData  
    });

    // Check for HTTP error responses
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Assuming the response is JSON
    console.log('Device list:', data);  // Print the response data
    return data;
  } catch (error) {
    console.error('Error fetching device list:', error.message);
    return { error: error.message };
  }
}

// Run the function and log the response
(async () => {
  const response = await getDeviceList();
  console.log('Response:', response);
})();
*/




import fetch from 'node-fetch';
import querystring from 'querystring';

async function getDeviceList() {
  const apiEndpoint = 'https://api.closeguardtechnology.com/v1/396slbHG7506Rlglhglbfj7/devicelist';

  const requestData = querystring.stringify({
    device_imei: '865205035850840',
  });

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Api-Token': '3853925hxnsvdebdyh36s',
        'Request-Id': '12345678',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36', // Optional
      },
      body: requestData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Device list:', data);
    return data;
  } catch (error) {
    console.error('Error fetching device list:', error.message);
  }
}

(async () => {
  await getDeviceList();
})();
