import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContractSchema = new Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  company: {
    type: String,
  },
  availability: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  specialization: {
    type: String,
  },
  clientemail: {
    type: String,
  },
  clientstatus: {
    type: String,
  },
  status: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
