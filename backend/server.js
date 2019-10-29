const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db");

app.use(express.static(__dirname + '/'));
app.use(cors({origin: "http://localhost:8080"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json ({
	extended: true,
	limit: "50mb"
}));

const cardRouter = require("./routes/card");
const userRouter = require("./routes/user");

app.use(cookieParser());
app.use("/api/todo/card", cardRouter);
app.use("/api/user", userRouter);

app.listen(9000, function(){
    console.log("server started 9000");
})
    
