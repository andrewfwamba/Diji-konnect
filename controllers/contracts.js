const mongoose = require("mongoose");

const { ContractSchema } = require("../models/contracts");

const Contract = mongoose.model("contract", ContractSchema);

export const newContract = (req, res) => {
  let newContract = new Contract(req.body);
  console.log(req.body);

  newContract.save((err, contract) => {
    if (err) {
      res.send(err);
    }
    res.json({success: true, contract});
  });
};

export const getContracts = (req, res) => {
  const status = "awaiting";
  Contract.find({status}, (err, contract) => {
    if (err) {
      res.send(err);
    }
    res.json(contract);
  });
};

export const myContracts = (req, res) => {
  const email = req.body.email;
  const status = req.body.status;
  Contract.find({status, email}, (err, contract) => {
    if (err) {
      res.send(err);
    }
    res.json(contract);
  });
};

export const getContractWithID = (req, res) => {
  Contract.findById(req.params.contractID, (err, contract) => {
    if (err) {
      res.send(err);
    }
    res.json(contract);
  });
};

export const getClientBooked = async (req, res) => {
  const clientemail = req.body.clientemail;
  Contract.find({clientemail}, (err, contract) => {
    if (err) {
      res.send(err);
    }
    res.json(contract);
  });
};

export const updateContract = (req, res) => {
  Contract.findOneAndUpdate(
    { _id: req.params.contractID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, contract) => {
      if (err) {
        res.send(err);
      }
      res.send({success:true,contract});
    }
  );
};

export const deleteContract = (req, res) => {
  Contract.deleteOne({ _id: req.params.contractID }, (err, contract) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Contract deleted successfully" });
  });
};
