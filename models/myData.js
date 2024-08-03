
import mongoose, { Schema } from "mongoose";
 
const newUser = new Schema({
  fName: {
    type: String,
  },
  lName: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  gender: {
    type: String,
  },
    country: {
      type:String
  }
},{timestamps :true});
 
export default mongoose.model(/*taple name*/  "newUser", newUser);