import http from 'http';
import express from 'express';

import envs from "../config/environment-vars";

export class ServerBoostrap {
    private app!: express.Application

    constructor(app: express.Application) {
        this.app = app;
    }

    init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            const PORT = envs.PORT || 4100;
            const HOST = (envs.HOST as string) || "0.0.0.0";

            server
            .listen(PORT, HOST)
            .on("listening", () => {
                console.log(`Server on http://localhost:${PORT}`);
                resolve(true);
            })
            .on("error", () => {
                console.error(`Error starting server on port ${PORT}`);
                reject(false);
            })
        });
    }
}