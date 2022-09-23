require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// const calculateOrderAmount = (items) => {
//     // Replace this constant with a calculation of the order's amount
//     // Calculate the order total on the server to prevent
//     // people from directly manipulating the amount on the client
//     return 1400;
//   };

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