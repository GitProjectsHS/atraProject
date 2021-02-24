const express = require('express');
const app= express();
const cors = require('cors');
const mongoose = require("mongoose");
const router=require("./routes/api")
const bodyParser=require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const connectionParams={
  useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}

mongoose.connect(process.env.DB_CONNECT,connectionParams)
.then(() => {
  console.log("connected to db")
})
.catch((err) => {
    console.log(`error connecting ${err}`)
})
app.use(bodyParser.json())

app.use(cors());

app.use('/',router)
app.use(express.json())
app.listen(3500,()=> console.log("app listen port 3500"))
