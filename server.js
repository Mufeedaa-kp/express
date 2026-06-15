const express = require("express");
const app = express();

app.use(express.json());


let users = [];
let id = 1;


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


app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});


app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, username } = req.body;

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
