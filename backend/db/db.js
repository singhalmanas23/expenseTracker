const mongoose=require('mongoose');

const db=async()=>{
    try{
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('dbConnected')
    }
    catch(error){
        console.log('db-error')

    }
}
module.exports= {db};
