const express = require("express");
const cors = require("cors")
const app = express();
const userRoute = require("./routes/v1/user.route.js");
const productRoute = require("./routes/v1/product.route.js")
const { connectToServer } = require("./utils/dbConnect.js");
const port = process.env.PORT || 5000


//middleware call
app.use(cors());
app.use(express.json())

//connect db
connectToServer((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`app listening on port ${port}`)
        })
    }
    else{
        console.log(err)
    }
})



//route
app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)


app.all("*",(req, res)=>{
    res.send("route not found !")
})


process.on("unhandledRejection",(error)=>{
    console.log(error.name , error.message);
    app.close(()=>{
        process.exit(1);
    });
});