const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/compressor", routes.compressorRouter);

app.get("/", (req, res) => {
  return res.json({ msg: "checking backend initial" });
});

app.listen(8000, () => {
  console.log("running on port" + 8000);
});
