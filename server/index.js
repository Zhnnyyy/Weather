require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post("/location", async (req, res) => {
  const url = `https://api.locationiq.com/v1/autocomplete?key=${process.env.LOCATION_KEY}&q=${req.body.location}`;
  const response = await fetch(url);
  const result = await response.json();
  res.json(result);
});

app.post("/weather", async (req, res) => {
  const loc = req.body.location;
  loc.split(",");
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
    loc.split(",")[0]
  }&lon=${loc.split(",")[1]}&appid=${process.env.WEATHER_KEY}`;
  const response = await fetch(url);
  const result = await response.json();
  res.json(result);
});

app.post("/forecast", async (req, res) => {
  const loc = req.body.location;
  loc.split(",");
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${
    loc.split(",")[0]
  }&lon=${loc.split(",")[1]}&appid=${process.env.WEATHER_KEY}`;
  const response = await fetch(url);
  const result = await response.json();
  res.json(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
