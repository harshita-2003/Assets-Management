const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies
app.use(cors()); // Add this line to enable CORS

mongoose.connect('mongodb://127.0.0.1:27017/assets', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const addassetschema = mongoose.Schema({
    id: {
        type: String,
        unique: true
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
        speed: Number
    }
});

const assetModel = mongoose.model('asset', addassetschema);


//backend -> frontend
app.get('/assets',async (req,res) => {
    try {
        const assets = await assetModel.find();
        if(assets){
            res.json(assets);
        }else{
            res.sendStatus(400)
        }
    } catch (error) {
        res.status(500).json(error);
    }
})


//frontend -> backend
app.post('/addasset', async (req, res) => {
    try {
        //check already existing id
        const existingAsset = await assetModel.findOne({ id: req.body.id });
        if (existingAsset) {
            return res.status(400).json({ error: 'Asset with this ID already exists' });
        }

        let newAsset = new assetModel(req.body);
        await newAsset.save();
        res.status(200);
    } catch (error) {
        res.status(500).json(error);
    }
});


app.delete('/deleteasset/:id' , async (req,res) => {
    try {
        const id = req.params.id;
        const result = await assetModel.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({error:"Asset Id not found"})
        }
        res.status(200).json('Asset deleted successfully');

    } catch (error) {
        res.status(500).send(error);
    }
    
})


app.put('/updateasset/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedAsset = req.body;
        const result = await assetModel.findByIdAndUpdate(id, updatedAsset, { new: true });

        if (!result) {
            return res.status(404).send({ error: "Asset Id not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
