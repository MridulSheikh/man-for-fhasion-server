const { getDb } = require("../utils/dbConnect")

module.exports.postUser = async (req, res) => {
    try{
        const body = req.body;
        const db = getDb();
        const result = await db.collection("user").insertOne(body);
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

module.exports.makeAdmin = async (req, res, next) => {
    try{
        const Email = req.params;
        const db = getDb();
        const filter = {email : Email.email};
        const updatedoc = { $set: {
              admin : true
          },};
        const result = await db.collection("user").updateOne(filter, updatedoc);
        res.status(200).send(result);
    }catch{
        res.status(400).send({
            success : false,
        })
    }
}

//remove admin

module.exports.removeAdmin = async (req, res, next) => {
    try{
        const Email = req.params;
        const db = getDb();
        const filter = {email : Email.email};
        const updatedoc = { $set: {
              admin : false
          },};
        const result = await db.collection("user").updateOne(filter, updatedoc);
        res.status(200).send(result);
    }catch{
        res.status(400).send({
            success : false,
        })
    }
}

module.exports.getOneSearchUser = async (req,res) => {
    try{
        const {email} = req.params;
        // const array = [];
        const db = getDb();
        const result = await  db.collection("user").findOne({email : email});
        // array.push(result)
        res.json([result])
    }catch(err){
        res.status(400).send({
            success : false,
        })
    }
}