require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { getDb } = require("../utils/dbConnect")

module.exports.payemntController = async (req, res, next) => {
    const service = req.body;
    const price = service.price;
    const amount = price*100;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"]
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}

module.exports.saveOrder= async (req, res)=>{
    try{
        const body = req.body;
        const db = getDb();
        const result = await db.collection("order").insertOne(body);
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