const { db } = require("./db/db");
const express = require("express");
const { readdirSync } = require('fs');
const path = require('path');
const router = require('./routes/transact');

// Middlewares
const cors = require("cors");
const app = express();

// //export const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Load routes dynamically
const routesPath = path.join(__dirname, 'routes');

readdirSync(routesPath).forEach(file => {
  const route = require(path.join(routesPath, file));
  app.use('/api/v1', route);
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
