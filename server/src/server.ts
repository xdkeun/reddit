import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import cors from "cors";
const app = express();
const origin = "*"
app.use(cors({
  origin
}))
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes);

let port = 4000;
app.listen(port, async () => {
  console.log(`server running at ${port}`);
  AppDataSource.initialize()
    .then(async () => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
