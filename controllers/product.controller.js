const { getDb } = require("../utils/dbConnect")

module.exports.getProduct = async (req, res) => {
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
        console.log(err)
    }
}