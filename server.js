require("dotenv").config();

const nodemailer = require('nodemailer');
const express = require("express");
const keys = require("./keys");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// no longer needed as express has its own parser now
// const bodyParser = require('body-parser')
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/home.html"));
  });

app.post("/email", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    console.log("working!")
    console.log(req.body);
    const name = req.body.name;
    // const email = 
    const message = `
    Contact Email: ${req.body.email}
    Message: ${req.body.message}    
    `
    console.log(name, message);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: keys.gmail.id,
          pass: keys.gmail.secret
        }
      });
      
      var mailOptions = {
        from: 'shelbyenglandcoding@gmail.com',
        to: 'shelbyenglandcoding@gmail.com',
        subject: 'RESPONSE NEEDED: Message from ' + name,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.json(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
    res.json(true);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });