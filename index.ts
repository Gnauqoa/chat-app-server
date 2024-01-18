import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import router from "./src/routes";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(router);

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
