require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./server");


const server = http.createServer(app);

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
