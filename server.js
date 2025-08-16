import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import appConfig from './src/config/app.js';
import app, { init } from './src/app.js';
import attachSocket from './src/socket/socketHandler.js';

dotenv.config();

const startServer = async () => {
  await init();
  
  const server = http.createServer(app);
  
  const io = new Server(server, {
    cors: {
      origin: (process.env.WEBSOCKET_CORS_ORIGIN || '').split(',').filter(Boolean),
      credentials: String(process.env.WEBSOCKET_CORS_CREDENTIALS || 'true') === 'true'
    },
    pingTimeout: Number(process.env.WEBSOCKET_PING_TIMEOUT || 60000),
    pingInterval: Number(process.env.WEBSOCKET_PING_INTERVAL || 25000),
    maxHttpBufferSize: Number(process.env.WEBSOCKET_MAX_HTTP_BUFFER_SIZE || 1e6),
    transports: (process.env.WEBSOCKET_TRANSPORTS || 'websocket,polling').split(',')
  });

  attachSocket(io);

  server.listen(appConfig.port, () => {
    console.log(`Server running at http://${appConfig.host}:${appConfig.port}`);
  });
};

startServer();