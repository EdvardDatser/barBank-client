import * as api from './api.js'; // Import the API module

// Handles the POST request from the frontend for user registration
export function post(req, res) {
    const user = req.body;

    // Make a POST request to your backend API with the user data
    api.post('users', { user })
        .then(response => {
            // If the response contains a user, store it in the session
            if (response.user) {
                req.session.user = response.user;
            }

            // Send back the API response as JSON
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        })
        .catch(err => {
            // Handle errors
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to register user' }));
        });
}
