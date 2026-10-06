// Import env first so process.env is loaded before anything else reads it.
import env from "./config/env.js";
import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.js";
import { initSockets } from "./sockets/index.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Express and Socket.io share ONE http server (required for Render).
const server = http.createServer(app);

// CORS origins come from .env so the same code works locally and on Vercel.
const corsOptions = { origin: env.clientOrigins, credentials: true };

const io = new Server(server, { cors: corsOptions });
app.set("io", io); // lets controllers emit events: req.app.get("io")

app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" })); // parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler); // must be last

initSockets(io);

const start = async () => {
  await connectDB();
  server.listen(env.port, () =>
    console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`)
  );
};

start();
