import app from './infrastructure/web/app';

import { ServerBoostrap } from './infrastructure/boostrap/server-boostrap';
import { AppDataSource } from './infrastructure/config/con_data_base';

const server = new ServerBoostrap(app);

(
    async () => {
        try {
            await AppDataSource.initialize();
            const instances = [server.init()];
            await Promise.all(instances);
        } catch (error) {
            console.error('Error starting server:', error);
        }
    }
)();