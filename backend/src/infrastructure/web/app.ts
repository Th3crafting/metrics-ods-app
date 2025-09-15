import express from "express";
import cors from "cors";

import routes from "../routes/index";

class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.app.use(cors({
            origin: "*",
            methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
            allowedHeaders: ["Content-Type","Authorization"],
        }));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use("/GRND", routes);
    }

    getApp() {
        return this.app;
    }
}

export default new App().getApp();