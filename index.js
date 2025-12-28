require("dotenv").config();     // Load environment variables
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const Contact = require("./models/contact");

const app = express();
const port = 3030;

// Connect MongoDB Atlas
connectDB();

// Middlewares
app.use(express.urlencoded({ extended: true }));  // For form data
app.use(express.json());
app.use(express.static("public"));

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/data", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ _id: -1 });
    res.render("data", { contacts });
  } catch (error) {
    res.send("Error loading data");
  }
});

// POST route for contact form
app.post("/contact_us", async (req, res) => {
  
  try {
    /*const newMessage = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      city:req.body.city,
      message: req.body.message,

    });*/
    const newMessage=new Contact(req.body); //get the data
    
    await newMessage.save();
    //to display success message
    res.send("Form Submitted & Stored in MongoDB Atlas!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: " + error.message);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
