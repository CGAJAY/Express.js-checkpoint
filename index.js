// Importing the Express module
import express from "express";

// Importing the path module
import path from "path";

import { fileURLToPath } from "url";

// Convert the module URL to a file path, providing a valid __filename
const __filename = fileURLToPath(import.meta.url);

// Extract the directory path from the __filename, effectively simulating __dirname
const __dirname = path.dirname(__filename);

// Create an Express application
const app = express();

//port number where the server will run
const port = 3000;

// Middleware to check if the request is within working hours
const workingHours = (req, res, next) => {
	const now = new Date();
	const day = now.getDay(); // Get the current day (0 = Sunday, 1 = Monday)
	const hour = now.getHours(); // Get the current hour (0-23)

	// Check if the current time is within working hours (Monday to Friday, 9 AM to 5 PM)
	const isWorkingDay = day >= 1 && day <= 7;
	// const isWorkingHour = hour >= 9 && hour < 23;

	if (isWorkingDay) {
		// If within working hours, proceed to the next middleware or route handler
		next();
	} else {
		// If outside working hours, send a message to the user
		res.send(
			"The website is only available during working hours (Monday to Friday, 9 AM to 5 PM)."
		);
	}
};

// Apply the working hours middleware to all routes
app.use(workingHours);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route for the Home page
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Route for the Our Services page
app.get("/services", (req, res) => {
	res.sendFile(
		path.join(__dirname, "src", "services.html")
	);
});

// Route for the Contact Us page
app.get("/contact", (req, res) => {
	res.sendFile(path.join(__dirname, "src", "contact.html"));
});

// Start the server and listen on the defined port
app.listen(port, () => {
	console.log(
		`Server is running on http://localhost:${port}`
	);
});
