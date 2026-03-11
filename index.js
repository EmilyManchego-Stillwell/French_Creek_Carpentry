import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import config from "./config.js";

const app = express();
const port = config.port;

// Using middleware to make styling show up and render ejs files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/services", (req, res) => {
  res.render("services.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { success: null, error: null, enteredData: {} });
});

app.post("/contact", async (req, res) => {
  const { userName, userEmail, userMessage } = req.body;

  try {
    // Send data to Google Apps Script
    const response = await axios.post(config.googleScriptURL, {
      userName,
      userEmail,
      userMessage 
    });

    // Check if Google actually succeeded
    if (response.data && response.data.result === "success") {
      res.render("contact.ejs", { 
        success: "Thanks! Your message has been sent.",
        error: null,
        enteredData: {} 
      });
    } else {
      throw new Error(response.data.message || "Google Script failed");
    }
  } catch (error) {
    console.error("Deployment Error:", error.message);
    res.render("contact.ejs", { 
      success: null, 
      error: "Sorry, there was a problem sending your message. Please try again later.",
      enteredData: req.body 
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});