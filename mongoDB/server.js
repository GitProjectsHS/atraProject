const express = require('express');
const app= express();
const cors = require('cors');
const mongoose = require("mongoose");
const router=require("./routes/api")
//התנהלות עם json
const bodyParser=require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const connectionParams={
  useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}

//התחברות לjs
mongoose.connect(process.env.DB_CONNECT,connectionParams)
.then(() => {
  console.log("connected to db")
})
.catch((err) => {
    console.log(`error connecting ${err}`)
})
//המרה לקבצי json
app.use(bodyParser.json())

app.use(cors());

//כל פעם שמתחיל יגיע קודם לrouter
app.use('/',router)
// app.use(express.json())
app.listen(3500,()=> console.log("app listen port 3500"))
