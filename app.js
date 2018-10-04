var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require("http").Server(app);
var io = require("socket.io")(http);


mongoose.Promise = Promise;

var conString = process.env.DATABASEURL;

app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

var Chats = mongoose.model("Chats", {
	name: String,
	chat: String
})
// app.get('/', (req, res) => {
// 	res.sendFile('index.html');
// });
mongoose.connect(conString, {useNewUrlParser: true}, (err) =>{
	console.log("Database connection", err);
})

app.post("/chats", async(req, res) => {
	try{
		var chat = new Chats(req.body);
		await chat.save();
		res.sendStatus(200);

		io.emit("chat", req.body);
	}
	catch(error){
		res.sendStatus(500)
		console.error(error);
	}
});

app.get("/chats", (req, res) => {
	chats.find({}, (error, chats) => {
		res.send(chats);
	})
});

io.on("connection", (socket) => {
	console.log("socket is connected...");
});

http.listen(8080, () => {
	console.log('Started!');
});