
# Network Monitor

This project replicates the network monitoring functionalities found in Google Chrome's DevTools. It allows users to monitor and analyze network requests made by a web page in real-time.

## Demo

- **Frontend deployed link:** [Frontend Demo](https://test-unity-xi.vercel.app/)
- **Enter this url to check the working:** [Demo Url](https://supabase.com/)

## Features

- **Request Monitoring:** Displays a real-time list of network requests made by the monitored page.
- **Request Details:** Provides detailed information about each request, including headers, payload, response data, and timing metrics.
- **Filtering:** Allows users to filter network requests by type (XHR, JS, CSS, etc.).
- **Response Visualization:** Visualizes response data such as JSON payloads or images directly within the application.

## Tech Stack

- **Frontend Framework:** ReactJS
- **HTTP Client:** Axios for making HTTP requests from the frontend.
- **Backend:** Docker with Puppeteer for handling backend tasks like scraping and data retrieval.
- **Server Backend:** Express with CORS middleware for handling Cross-Origin Resource Sharing.

## Screenshots

![Network Monitor Screenshot](https://github.com/user-attachments/assets/6e01f873-de6f-4c98-b223-1e6a53cfd792)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/itiaditi/TestUnity.git
   cd TestUnity
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Start the backend server:**
   ```bash
   npm run server
   ```

5. **Run the frontend application:**
   ```bash
   npm run dev
   ```

6. **View the application:**
   Open your browser and navigate to `http://localhost:5173` to access the Network Monitor.

## Usage

- **Launch Application:** Open the application in your web browser.
- **Enter URL:** Enter the URL of the web page you want to monitor and press enter.
- **View Requests:** The monitor will start listing all network requests made by the page.
- **Request Details:** Click on any request to view detailed information such as headers, payload, and response data in a modal.
- **Filter Requests:** Use the filter buttons (e.g., XHR, JS, CSS) to focus on specific types of requests.

## Additional Notes

- Ensure that CORS settings in the Docker-Puppeteer backend are configured correctly to handle requests from different origins.
- For advanced users, consider adding features like exporting data, saving sessions, or integrating with other monitoring tools.
