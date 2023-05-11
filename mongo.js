import mongoose from "mongoose";
import express from "express";
import { dataSchema } from "./channel.js";

const app = express();
const PORT = 3000;

const uri = `mongodb+srv://oceanscope:oceanscope@cluster0.fbyof7e.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri).then(() => {
  console.info("Connected to the DB");
});

const Data = mongoose.model("Data", dataSchema);

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    const data = await Data.find().lean();
    console.log(data); // log the data variable
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
});
