const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Dummy users database
const users = {
  "student1": { "password": "password123", "name": "Student One", "role": "student" },
  "student2": { "password": "password456", "name": "Student Two", "role": "student" }
  // Add more users as necessary
};

// Function to validate user
const validateUser = (username, password) => {
  if (users[username] && users[username].password === password) {
    return { username, name: users[username].name, role: users[username].role };
  }
  return null;
};

// POST endpoint for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const user = validateUser(username, password);

  if (user) {
    return res.status(200).json(user); // Return the user object if valid
  } else {
    return res.status(401).json({ error: "Invalid credentials" }); // Unauthorized
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
