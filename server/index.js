const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const port = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies
app.use(cors()); // Add this line to enable CORS

mongoose.connect(process.env.MONGO_URL);

const addassetschema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: String,
  description: String,
  location: String,
  manufacturer: String,
  modelNumber: String,
  serialNumber: String,
  installationDate: String,
  lastMaintenanceDate: String,
  status: String,
  specifications: {
    power: Number,
    voltage: Number,
    current: Number,
    speed: Number,
  }
});

const assetModel = mongoose.model("asset", addassetschema);

//backend -> frontend
app.get("/assets", async (req, res) => {
  try {
    const assets = await assetModel.find();
    if (assets) {
      res.json(assets);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//frontend -> backend
app.post("/addasset", async (req, res) => {
  try {
    //check already existing id
    const existingAsset = await assetModel.findOne({ id: req.body.id });
    if (existingAsset) {
      return res
        .status(400)
        .json({ error: "Asset with this ID already exists" });
    }

    let newAsset = new assetModel(req.body);
    await newAsset.save();
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/deleteasset/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await assetModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ error: "Asset Id not found" });
    }
    res.status(200).json("Asset deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/updateasset/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAsset = req.body;
    const result = await assetModel.findByIdAndUpdate(id, updatedAsset, {
      new: true,
    });

    if (!result) {
      return res.status(404).send({ error: "Asset Id not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//ticketmaintenance work
const ticketschema = mongoose.Schema({
  ticketId: String,
  assetId: String,
  description: String,
  raiseddate: String,
  status: String,
});

const ticketModel = mongoose.model("Tickets", ticketschema);

app.post("/addticket", async (req, res) => {
  try {
    const { assetId, description, raiseddate, status } = req.body;

    const assetExists = await assetModel.findOne({ id: assetId });
    if (!assetExists) {
      return res.status(400).json({ error: "AssetId not found" });
    }

    // Generate ticket ID
    const ticketCount = await ticketModel.countDocuments();
    const ticketId = `TCK-${ticketCount + 101}`;

    const newTicket = new ticketModel({
      ticketId,
      assetId,
      description,
      raiseddate,
      status,
    });
    await newTicket.save();
    res.status(200).json({ message: "Ticket added successfully", ticketId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getticket", async (req, res) => {
  try {
    const data = await ticketModel.find();
    if (data) {
      res.json(data);
    } else {
      res.json("data not found!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/deleteticket/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteticket = await ticketModel.findByIdAndDelete(id);

    if (!deleteticket) {
      return res.status(404).send({ error: "Ticket Id not found" });
    }
    res.status(200).json("ticket delete successfull");
  } catch (error) {
    res.status(404).json("cannot delete");
  }
});

app.put("/updateticket/:id", async (req, res) => {
  try {
    const { assetId } = req.body;

    const assetExists = await assetModel.findOne({ id: assetId });
    if (!assetExists) {
      return res.status(400).json({ error: "AssetId not found" });
    }

    const id = req.params.id;
    const updata = req.body;
    const result = await ticketModel.findByIdAndUpdate(id, updata, {
      new: true,
    });

    if (!result) {
      res.status(404).json("result cannot be updated");
    }
    res.status(200).json("data updated successfully");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

