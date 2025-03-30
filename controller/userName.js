const Username=require('../models/UserName')

const setUserName=async (req,res)=>{
const { username}=req.body

try{
const existingUser= await Username.findOne({username})
if(existingUser){
    return res.status(400).json({ error: 'Username already taken' });
}

const newUser=new Username({username:username})
await newUser.save()

res.json({message:'Username saved successfully',username:username})

}catch(error){
    res.status(500).json({ error: 'Failed to set username', details: error.message });
}
}

module.exports=setUserName