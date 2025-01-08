import http from 'http';
import { Routes } from './Route.js';
const server = http.createServer(Routes);
server.listen(3000);
