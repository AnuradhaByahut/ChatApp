/*const express = require("express")
const dotenv= require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const userRoutes=require("./routes/userRoutes")
const chatRoutes= require("./routes/chatRoutes")
const messageRoutes= require("./routes/messageRoutes")
const path= require("path")

const { notFound, errorHandler } = require("./middleware/errorMiddleware");


connectDB()
const app=express();



app.use(express.json());

 app.use("/api/user", userRoutes);
 app.use("/api/chat", chatRoutes);
 app.use("/api/message", messageRoutes);


//---------------------------deplay-----------------------------

 const __dirname1=path.resolve();

 if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname1,"/frontend/build")))

    app.get("*",(req,res)=>{
       res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
    })
 }
 else{
    app.get("/",(req,res)=>{
        res.send("Api is running")
    })
 }

 //---------------------------deplay-----------------------------



app.use(notFound);
app.use(errorHandler);


const PORT= process.env.PORT || 5000;

const server=app.listen(PORT,console.log(`server started at ${PORT}`));

const io = require("socket.io")(server,{
    pingTimeout: 60000,
    cors:{
        origin: "http://localhost:3000",
    } 
});

io.on("connection",(socket)=>{
    console.log("Connected");

    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room)=>{
        socket.join(room);
        console.log("User joined Room: " + room);
    });


    socket.on("typing", (room)=>socket.in(room).emit("typing"));
    socket.on("stop typing", (room)=>socket.in(room).emit("stop typing"));


    socket.on("new message", (newMessageRecieved)=>{
        var chat=newMessageRecieved.chat;

        if(!chat.users){
            return console.log("chat.users not defined");
        }

        chat.users.forEach(user=>{
            if(user._id==newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved" , newMessageRecieved);
        });
    });
    
    socket.off('setup',()=>{
        console.log("User Disconnected");
        socket.leave(userData._id);
    });

});   */



const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();

// Body parser middleware
app.use(express.json());

// Route setup
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------- Deployment -----------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running");
    });
}

// --------------------------- Deployment -----------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Setting up Socket.IO
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000", // Replace with your frontend URL
    }
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        const chat = newMessageReceived.chat;

        if (!chat.users) {
            return console.log("chat.users is undefined");
        }

        chat.users.forEach(user => {
            if (user._id === newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });

    socket.off('setup', () => {
        console.log("User disconnected");
        socket.leave(userData._id);
    });
});



