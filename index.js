import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/productsRoute";

const app = express();
const PORT = 3000

// mongoDB Connection 

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://akhiltissa03:akhiltissa03@cluster0.6bxdd.mongodb.net/",{
  useNewUrlParser: true
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

routes(app)

app.get("/", (req, res)=>{
    res.send(" Hello World ")
})

app.listen(PORT, ()=>{
    console.log(`Hello ${PORT}`)
})