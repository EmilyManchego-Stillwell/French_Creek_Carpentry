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
  res.render("contact.ejs", { success: null });
});

app.post("/contact", async (req, res) => {
  const { userName, userEmail, userMessage } = req.body;

  try {
    // Send data to Google Apps Script
    await axios.post(config.googleScriptURL, null, {
      params: {
        userName,
        userEmail,
        userMessage
      }
    });

    res.render("contact.ejs", { success: "Thanks! Your message has been sent." });
  } catch (error) {
    console.error("Error sending to Google Script:", error);
    res.status(500).send("Communication error.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});