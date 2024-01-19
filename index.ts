import bcrypt from "bcryptjs";
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import router from "./src/routes";
import { errorType } from "./src/utils/auth";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(router);

// Custom error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Handle the error here
  console.error(err as errorType);
  res.status(err.status).json({ message: err.message });
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  console.log(await bcrypt.hash("12345678", 10));

  console.log(`Server is running on http://localhost:${PORT}`);
});
