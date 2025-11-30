# 🌦️ Dynamic Weather Dashboard

> A sleek, responsive weather dashboard built with pure vanilla JavaScript. It transforms OpenWeather API data into a beautiful glassmorphism UI, complete with dynamic backgrounds, animated Skycons, and a detailed 5-day forecast.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Click_Here-blue?style=for-the-badge&logo=netlify)](https://nimbus-cloud-dashboard.netlify.app/)

## 📸 Screenshots

<div align="center">
  <img src="<img width="1647" height="770" alt="Screenshot (56)" src="https://github.com/user-attachments/assets/05be6769-93f5-44d3-904d-2c502d9107f3" />
" alt="Dashboard Main View" width="30%" />
  <img src="<img width="1625" height="795" alt="Screenshot (57)" src="https://github.com/user-attachments/assets/f270deb5-39ba-469a-a6d2-d60f38305548" />
" alt="Mobile View" width="30%" />
  <img src="./path-to-your-image3.png" alt="Search Result" width="30%" />
</div>

---

## ✨ Core Features

* **Real-time Weather:** Fetches live data for any city globally.
* **📍 Geolocation:** Automatically detects user location on startup.
* **📅 5-Day Forecast:** Detailed forecast cards including High/Low temps.
* **🎨 Dynamic Backgrounds:** The UI changes based on the weather condition (Sunny, Rainy, Cloudy, etc.).
* **🔄 Unit Conversion:** Toggle seamlessly between Celsius (°C) and Fahrenheit (°F).

## 🛠️ Technology Stack

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5**
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3 (Flexbox & Grid)**
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **JavaScript (ES6+)**
* ☁️ **OpenWeather API**
* 🌥️ **Skycons** (Animated weather icons)

---

## 🚀 How to Run Locally

Follow these steps to get the project running on your machine:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/ayush007-lio/Nimbus-cloud-hub.git](https://github.com/ayush007-lio/Nimbus-cloud-hub.git)
    cd Nimbus-cloud-hub
    ```

2.  **Get an API Key**
    * Sign up at [OpenWeatherMap](https://openweathermap.org/api).
    * Subscribe to the "Current Weather" and "5 Day Forecast" APIs (Free tier).

3.  **Configure the Key**
    * Open `script.js` (or your config file).
    * Replace the placeholder key with your actual API key:
        ```javascript
        const apiKey = "YOUR_OPENWEATHER_API_KEY";
        ```

4.  **Run the App**
    * Simply open `index.html` in your preferred browser.
    * *Optional:* Use the "Live Server" extension in VS Code for a better experience.

---

## 🧠 How it Works (Workflow)

Here is a breakdown of the logic behind the dashboard:

### 1. 🟢 When You First Open the Page
When `index.html` loads, the app wakes up. It reads the HTML layout, applies CSS styles, and initializes the JavaScript.
* The script attaches "click" listeners (event listeners) to buttons.
* It waits for user interaction or geolocation permission.

### 2. 🔍 When You Search for a City
1.  You type "London" and hit the search button.
2.  The app triggers the search event.
3.  **UI Update:** The loading spinner appears, and old results are hidden.
4.  **API Call:** The app sends two parallel requests to OpenWeather:
    * *"What's the weather right now?"* (Current Weather API)
    * *"What's the forecast for the next 5 days?"* (Forecast API)
5.  The app waits for both promises to resolve.

### 3. 📡 When the Weather Info Comes Back
1.  The app receives the JSON data.
2.  **UI Update:** Hides the loading spinner.
3.  **Rendering:**
    * Updates the City Name and Current Temp (e.g., 15°C).
    * **Dynamic Background:** Changes the wallpaper based on weather condition (e.g., Sunny).
    * **Skycons:** Renders the appropriate animated icon.
    * **Forecast:** Loops through the data to create 5 forecast cards.
4.  Finally, the new information fades in smoothly.

### 4. 🌡️ When You Click the °C / °F Toggle
1.  You click the unit switch.
2.  **No API Call:** The app *does not* request new data.
3.  **Math Logic:** It takes the stored temperature (Celsius), applies the conversion formula, and updates the DOM text instantly.
4.  This updates the main temperature and all 5-day forecast cards simultaneously.

### 5. ❌ What If You Search for a Fake City?
1.  You type "FakeCity" and hit search.
2.  The app sends the request.
3.  OpenWeather responds with a `404 Not Found`.
4.  The app catches this error.
5.  **Error Handling:** It hides the spinner and displays a user-friendly **red error message** ("City not found") instead of breaking the UI.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
