const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const multer = require('multer');
app.use('/file', express.static('file'));
app.use(multer({dest:__dirname+'/file/uploads/'}).any());
app.use(cors({origin: "http://localhost:8080"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json ({
	extended: true,
	limit: "50mb"
}));

const cardRouter = require("./routes/card");
const userRouter = require("./routes/user");

app.use("/api/todo/card", cardRouter);
app.use("/api/user", userRouter);

app.listen(9000, function(){
    console.log("server started 9000");
})
    
