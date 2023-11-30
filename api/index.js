import express from "express";
import axios from "axios";

const app = express();
app.use(express.static("public"));

const PORT = 3000;
const apiKey = "7f90f3c15161caa6ae312aad7c2b9008";

app.get("/weather", async (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.address}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response) res.send(response.data);
  } catch (error) {
    res.send("Unable to fetch data, Please try again. " + error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
