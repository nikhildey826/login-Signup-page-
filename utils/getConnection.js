const { get } = require("mongoose")
const mongoose=require("mongoose")
const getConnection= () =>{
    try {
        mongoose.connect(process.env.MONGO_URI).then((connection)=>{
            console.log('db is connected')
        }).catch((error) =>{

            console.log('failed to connect to db')
        })
    }catch (error) {
        console.log(error.message)
    }
}

module.exports=getConnection  