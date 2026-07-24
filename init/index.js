const mongoose=require('mongoose');
const initData=require('./data.js')
const Listing=require('../models/listing.js');

main().then(()=>{
    console.log("connection successfull")
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
}


const initDB= async()=>{
  await  Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"6a5e17a5610523c1bacc4f04"}));
  await Listing.insertMany(initData.data);
  console.log("data was initalized");
}

initDB();