import http from 'http';
// import cron from 'node-cron';
import os from 'os';
import { Server as SocketServer } from 'socket.io';

import app from './app.js';
import configs from './configs.js';
import socketHandler from './socket.io.js'; 
import LogUtils from './utils/LogUtils.js';

import * as dotenv from 'dotenv';
import { insertData } from '../tool/update-data.js';
dotenv.config();

const serverIp = Object.entries((Object.entries(os.networkInterfaces())[0]))?.[1]?.[1]?.filter(x => x.family === 'IPv4')?.[0]?.address || '';
const serverPort = configs.port;
const serverApi = http.createServer(app);

const io = new SocketServer(serverApi, {
  cors: { origin: '*', }
});
io.on('connection', (socket) => socketHandler(io, socket));

serverApi.listen(serverPort, () => {
  // insertData();

  LogUtils.info('SERVER', `Server running at ${serverIp}:${serverPort}`);
  LogUtils.info('mongodbUrl', `DB running at ${process.env.MONGO_URI}`);

  // if (configs.isProd) {
  //   let startMgs = '------------------------------------------------------';
  //   startMgs += `\nServer running at *${serverIp}:${serverPort}*`;
  //   const machineInfo = {
  //     hostname: os.hostname(),
  //     platform: os.platform(),
  //     release: os.release(),
  //     type: os.type(),
  //     arch: os.arch(),
  //     cpuModel: os.cpus()?.[0]?.model,
  //     memory: `${FormatUtils.formatBytes(os.freemem())} / ${FormatUtils.formatBytes(os.totalmem())}`,
  //   }
  //   startMgs += `\nMachine info: \`\`\`${JSON.stringify(machineInfo, null, 2)}\`\`\``;

  //   startMgs += '\n------------------------------------------------------\n';
  //   SlackUtils.sendMessage(startMgs);

  //   const scheduleOpts = { scheduled: true, timezone: 'Asia/Ho_Chi_Minh' };

  //   // schedule task run every hour at minute 45
  //   cron.schedule('20 * * * *', async () => {
  //     SlackUtils.sendMessage('*[USER_BEHAVIOR]* Running a task every hour at minute 45 to import user behavior to FPT');
  //     LogUtils.info('SERVER', 'Running a task every hour at minute 45 to import user behavior to FPT');

  //     fptService.importUserBehaviorToFpt();
  //   }, scheduleOpts);

  //   // schedule task run every day at 02:00 AM import product data to FPT
  //   cron.schedule('0 2 * * *', () => {
  //     LogUtils.info('SERVER', 'Running a task every day at 02:00 AM to import product data to FPT');
  //     SlackUtils.sendMessage('*[RECOMMEND_IMPORT]* Running a task every day at 03:00 AM to product import data to FPT');
  //     fptService.importProductDataToFpt()
  //   }, scheduleOpts);

  //   // schedule task run every day at 04:00 AM to update recommend data
  //   cron.schedule('0 4 * * *', () => {
  //     LogUtils.info('SERVER', 'Running a task every day at 04:00 AM to to update recommend data');
  //     SlackUtils.sendMessage('*[RECOMMEND_UPDATE]* Running a task every day at 04:00 AM to update recommend data');
  //     fptService.updateRecommendData()
  //   }, scheduleOpts);
  // }
});
