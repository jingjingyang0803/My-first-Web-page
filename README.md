# **TAMK Weather Station Project**

## **Introduction**

Welcome to the TAMK Weather Station project. This project is designed to provide real-time weather information in a user-friendly web application. It fetches the latest weather measurements from the backend API and displays them in both tabular and graphical formats.

## **Features**

1. **Dynamic Date Display**: Shows the current day and date at the top of the page.
2. **Menu-based Navigation**: Allows users to easily switch between different views with a menu. Only one view is displayed at a time.
3. **Real-time Data Fetching**: Data from the backend API is fetched and displayed in real-time.
4. **Multiple Views for Weather Data**:
   - Home: Shows the latest 30 measurements of all types.
   - Temperature: Displays temperature data in table and chart formats.
   - Wind Speed: Shows wind speed data.
   - More: Allows users to select a measurement type and time interval.
5. **Data Sorting**: Users can sort data in ascending or descending order based on values.
6. **Interactive Charts**: Charts with features like mark points for max and min, mark line for average, and tooltips.
7. **Responsive Design**: The application is designed to be responsive and user-friendly across different devices.

## **Technologies Used**

- **HTML/CSS**: For structuring and styling the web pages.
- **JavaScript (jQuery)**: To make the website interactive and dynamically update the content.
- **ECharts Library**: For creating interactive and responsive charts.
- **AJAX (Fetch API)**: For asynchronous data fetching from the backend API.

## **Setup and Usage**

1. **Dependencies**:
   - Ensure you have a modern web browser installed.
   - Internet connection to fetch the latest weather data.
2. **Running the Application**:
   - Open the **`index.html`** file in a web browser.
   - Navigate through the menu to view different weather data views.
3. **Interacting with Data**:
   - Click on the menu items to switch between different views.
   - Use the sorting buttons in each view to sort data.
   - Hover over the charts to see detailed information.

## **Views Explanation**

1. **Home View**: Displays the latest 30 weather measurements of all types in a table.
2. **Temperature View**: Shows the latest temperature data. Users can select different intervals like 24 hours, 48 hours, etc.
3. **Wind Speed View**: Similar to the Temperature view, but displays wind speed data.
4. **More View**: Users can select the type of measurement and the time interval for more customized data representation.
