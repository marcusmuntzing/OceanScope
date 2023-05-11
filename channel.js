import mongoose from "mongoose";
import {ObjectId} from "mongodb";

const dataSchema = new mongoose.Schema({
  timestamp: String,
  temp: String,
  location: Array,
});

export { dataSchema };
