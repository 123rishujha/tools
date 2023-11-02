const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "checking backend initial" });
});

app.listen(8000, () => {
  console.log("running on port" + 8000);
});
