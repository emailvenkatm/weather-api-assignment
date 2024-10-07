# Weather API Assignment

## Project Overview

This project implements a simple **HTTP server** built with **Node.js** and **TypeScript**, which exposes an endpoint to retrieve weather data using the **OpenWeather API**. The server accepts latitude and longitude as query parameters and returns:
- Current weather conditions (e.g., rain, snow, clear).
- A classification of the weather as hot, cold, or moderate.
- Any active weather alerts in that region.

The API follows **RESTful standards** and is built with a focus on **scalability**, **maintainability**, and **security**.

## Features
- **RESTful API** with input validation and error handling.
- **Weather data** is fetched from OpenWeather using the One Call API.
- **Error logging** using Winston.
- Unit-tested using **Jest**.


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/emailvenkatm/weather-api-assignment.git
cd weather-api
```
### 2. Install Dependencies

Install the necessary dependencies using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add  **OpenWeather API key**:

```bash
# .env
OPEN_WEATHER_API_KEY=openweather_api_key
PORT=3000
NODE_ENV=development
```


### 4. Start the Development Server

To start the server in development mode, run the following command:

```bash
npm run dev
```


The server will start at `http://localhost:3000`. You can access the API by opening your browser or using a tool like Postman to visit the following URL:


### Example Response

For the request:

```bash
GET http://localhost:9090/api/weather?lat=27.994402&lon=-81.760254
```

The response might look like this:

```json
{
  "weatherCondition": "Rain",
  "temperature": 21.51,
  "temperatureClassification": "moderate",
  "alerts": [
    {
      "sender_name": "NWS Tampa Bay Ruskin FL",
      "event": "Flood Watch",
      "start": 1728260760,
      "end": 1728561600,
      "description": "* WHAT...Flooding caused by excessive rainfall continues to be\npossible.\n\n* WHERE...Portions of southwest and west central Florida, including\nthe following areas, in southwest Florida, Coastal Charlotte,\nCoastal Lee, Inland Charlotte and Inland Lee. In west central\nFlorida, Coastal Citrus, Coastal Hernando, Coastal Hillsborough,\nCoastal Levy, Coastal Manatee, Coastal Pasco, Coastal Sarasota,\nDeSoto, Hardee, Highlands, Inland Citrus, Inland Hernando, Inland\nHillsborough, Inland Levy, Inland Manatee, Inland Pasco, Inland\nSarasota, Pinellas, Polk and Sumter.\n\n* WHEN...Through Thursday morning.\n\n* IMPACTS...Excessive runoff may result in flooding of rivers,\ncreeks, streams, and other low-lying and flood-prone locations.\nStorm drains and ditches may become clogged with debris.\n\n* ADDITIONAL DETAILS...\n- * ADDITIONAL DETAILS...\n- Heavy rainfall is forecast this week as deep moisture streams\nacross the area. Then, as Hurricane Milton approaches late\non Wednesday, the threat for heavy rainfall will increase\neven\nfurther. Rainfall totals of 5 to 10 inches, with isolated\ntotals up\nto 15 inches will be possible.\n- https://www.weather.gov/safety/flood\n- https://www.weather.gov/safety/flood",
      "tags": [
        "Flood"
      ]
    }
  ]
}
```

- `weatherCondition`: Shows the current weather condition, e.g., "Clear", "Rain", etc.
- `temperature`: Displays the current temperature in Celsius.
- `temperatureClassification`: Describes the temperature as "hot", "cold", or "moderate" based on predefined thresholds.
- `alerts`: Shows any active weather alerts. In this case, there are none, so the array is empty.


Replace the latitude and longitude with the desired values to fetch weather data for that location.


### 5. Run Tests

To run the unit tests using **Jest**, use the following command:

```bash
npm run test
```

To check code coverage, run the following command:

```
npm run test -- --coverage
```

These commands will execute all the unit tests and generate a coverage report, ensuring that code is properly tested.

### 6. Making Improvements (Future)

Here are some potential improvements that could further enhance the project.

- **Caching**: Implement Redis-based caching to replace in-memory caching.
- **Rate Limiting**: Add more sophisticated rate-limiting strategies.
- **Retry Logic**: Implement retries for network failures.
- **Documentation**: Auto-generate API documentation using **Swagger**.