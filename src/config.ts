import { v4 } from "uuid";
import { ServiceMode } from "./types";

const DEMO_ENDPOINT =
  "https://gist.githubusercontent.com/vichaunter/939093f6e295df03e7962e849919e703/raw/12122ff53f89deb3f9b171968053c78761908100/scrapito_example_response.json";

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

export default serviceConfig;
