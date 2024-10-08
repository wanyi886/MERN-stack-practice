const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const cors = require("cors");


const MDB_CONNECT = "mongodb+srv://dev:KoA6AO0UKjnFJRCp@cluster2.s8zzghz.mongodb.net/dev?retryWrites=true&w=majority";


const app = express();

const PORT =  1075;

// Limitation for x-powered-by and etag headers
app.set('x-powered-by', false);
app.set('etag', false);

app.use(express.json()) ;
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:1076"],
    credentials: true // allows to set credentials to the origin
}));


// This express.json() middleware reads the "Content-Type" header, see if it's "application/json", if it is, the middleware will parse the content
app.use("/auth", userRouter);
app.use("/product", productRouter)

app.get("/test", (req, res) => {
    res.send("works");
})



app.listen( PORT, () => 
    console.log(`Server started on port: ${PORT}`
));

mongoose.connect(
    MDB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useFindAndModify: false,
        useCreateIndex: true
    }, 
    (err) => {
        if (err)return console.error(err);

        console.log("Connected to MongoDB")
});

