const { ObjectId } = require("bson");
const { getDb } = require("../utils/dbConnect")

module.exports.getProduct = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const db = getDb();
        const productCollection = db.collection("product")
        const pfind = productCollection.find({})
        const size = await pfind.toArray()
        const curser = productCollection.find({}).limit(limit * 1).skip((page - 1) * limit);
        const result = await curser.toArray();
        res.send({
            Length : size.length,
            success: true,
            body: result
        })
    } catch (err) {
        next(err)
    }
}

module.exports.getOneProduct = async (req, res, next) => {
    try{
        const db = getDb();
        const {id} = req.query;
        const cursor = await db.collection("product").findOne({ _id : ObjectId(id)});
        if(cursor){
            res.send({
                success : true,
                data : cursor
            })
        }
        else{
            res.status(404).send({
                success : false,
            })
        }
    }catch(err){
        next(err)
    }
}

module.exports.insertOneProduct = async (req, res, next) => {
    try{
        const db = getDb();
        const body = req.body;
        const result = await db.collection("product").insertOne(body);
        if(result.insertedId){
            res.status(200).send({
                successfull : true,
                id : result.insertedId,
                body : body,
            })
        }
    }catch(err){
        next(err)
    }
}


module.exports.deleteOneProduct = async (req, res, next) =>{
    try{
        const db = getDb();
        const {id} = req.params;
        const result = await db.collection("product").deleteOne({_id : ObjectId(id)})
        res.status(200).send({
            success : true,
            result : result
        })
    }catch(err){
        next(err)
    }
}