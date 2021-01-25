const mongoose=require("mongoose")
const config=require("config")

const connectDB=()=>{
    mongoose
    .connect(config.get("MONGO_URI"),{useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true,useFindAndModify: false})
    .then(()=>console.log("mongoose connected"))
    .catch(()=>console.log("DB error"))
}
module.exports=connectDB;