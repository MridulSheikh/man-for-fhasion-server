const { getDb } = require("../utils/dbConnect")

module.exports.postUser = async (req, res) => {
    try{
        const body = req.body;
        console.log(body)
        const db = getDb();
        const result = await db.collection("user").insertOne(body);
        console.log(result)
        if(result.insertedId){
            res.status(200).send({
                successfull : true,
                id : result.insertedId,
                body : body,
            })
        }
    }catch(err){
        res.status(500).send({
            successfull: false,
        })
        console.log(err)
    }
}

module.exports.getUser = async (req, res) => {
    try{
        const db = getDb();
        const curser = db.collection("user").find({});
        const result = await curser.toArray();
        res.status(200).send({
            success : true,
            body : result
        });
    }catch(err){
        res.status(400).send({
            success : false,
        })
    }
}

module.exports.getOneUser = async (req,res) => {
    try{
        const {email} = req.params;
        const db = getDb();
        const result = await  db.collection("user").findOne({email : email});
        res.json(result)
    }catch(err){
        res.status(400).send({
            success : false,
        })
    }
}

