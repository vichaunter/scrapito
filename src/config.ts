import { v4 } from "uuid";
import { ServiceMode } from "./types";
import pc from "picocolors";

const DEMO_ENDPOINT =
  "https://gist.githubusercontent.com/vichaunter/939093f6e295df03e7962e849919e703/raw/46c53f8a3bd15674f68dc079c01d124e3d7d9fd5/scrapito_example_fetch.json";

const INTERVAL = !isNaN(Number(process.env.INTERVAL))
  ? Number(process.env.INTERVAL)
  : 5000;

const serviceConfig = {
  id: v4(),
  fetchEndpoint: process.env.FETCH_ENDPOINT || DEMO_ENDPOINT,
  sendEndpoint: process.env.SEND_ENDPOINT,
  interval: INTERVAL,
  mode: process.env.MODE as ServiceMode,
};

export const log = (message: string) => {
  console.log(pc.white("-------------------------------"));
  console.log(message);
  console.log(pc.white("-------------------------------"));
};

export default serviceConfig;
