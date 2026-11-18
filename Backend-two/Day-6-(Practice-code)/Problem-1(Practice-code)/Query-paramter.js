import express from "express";
const app = express();

const PORT = 3000;
app.use(express.json());

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    profile: { age: 30, city: "NYC" }
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    profile: { age: 25, city: "LA" }
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@example.com",
    profile: { age: 35, city: "Chicago" }
  }
];

app.get("/", (req, res) => {
    res.send("Hello ji ");
});

app.get("/users", (req, res) => {
    // Destructure all possible query params
    const { name, email, city, age } = req.query;
    console.log("Query params:", req.query);

    let filteredUsers = users;

    // Filter by name (exact match)
    if (name) {
        filteredUsers = filteredUsers.filter(user => 
            user.name === name
        );
    }

    // Filter by email (exact match)
    if (email) {
        filteredUsers = filteredUsers.filter(user => 
            user.email === email
        );
    }

    // Filter by city (from profile)
    if (city) {
        filteredUsers = filteredUsers.filter(user => 
            user.profile.city === city
        );
    }

    // Filter by age (from profile)
    if (age) {
        const ageNum = Number(age);
        filteredUsers = filteredUsers.filter(user => 
            user.profile.age === ageNum
        );
    }

    // Return filtered results
    res.status(200).json({
        count: filteredUsers.length,
        users: filteredUsers
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});