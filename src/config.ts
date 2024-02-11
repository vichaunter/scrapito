import { v4 } from "uuid";
import { ServiceMode } from "./types";
import pc from "picocolors";

const DEV_FETCH_ENDPOINT = "http://localhost:4000/get-task";
const DEV_SEND_ENDPOINT = "http://localhost:4000/send-data";

const INTERVAL = !isNaN(Number(process.env.INTERVAL))
  ? Number(process.env.INTERVAL)
  : 5000;

const serviceConfig = {
  id: v4(),
  fetchEndpoint: process.env.FETCH_ENDPOINT || DEV_FETCH_ENDPOINT,
  sendEndpoint: process.env.SEND_ENDPOINT || DEV_SEND_ENDPOINT,
  interval: INTERVAL,
  mode: process.env.MODE as ServiceMode,
};

export const log = (message: string) => {
  console.log(pc.white("-------------------------------"));
  console.log(message);
  console.log(pc.white("-------------------------------"));
};

export default serviceConfig;
