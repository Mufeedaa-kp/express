const express = require("express");
const app = express();

app.use(express.json());

// In-memory user storage
let users = [];
let id = 1;

/**
 * POST /users
 * Create a user
 */
app.post("/users", (req, res) => {
  const { name, email, username } = req.body;

  if (!name || !email || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = {
    id: id++,
    name,
    email,
    username,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
});

/**
 * GET /users
 * Get all users
 */
app.get("/users", (req, res) => {
  res.json(users);
});

/**
 * GET /users/:id
 * Get user by id
 */
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

/**
 * PUT /users/:id
 * Update user
 */
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, username } = req.body;

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update only provided fields
  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    username: username || users[userIndex].username,
  };

  res.json({
    message: "User updated successfully",
    user: users[userIndex],
  });
});

/**
 * DELETE /users/:id
 * Delete user
 */
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.json({
    message: "User deleted successfully",
    user: deletedUser[0],
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});