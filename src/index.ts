import { scraper } from "./scraper";
import pc from "picocolors";
import { v4 } from "uuid";

const DEMO_ENDPOINT =
  "https://gist.githubusercontent.com/vichaunter/939093f6e295df03e7962e849919e703/raw/12122ff53f89deb3f9b171968053c78761908100/scrapito_example_response.json";

export const serviceConfig = {
  id: v4(),
  fetchEndpoint: process.env.FETCH_ENDPOINT || DEMO_ENDPOINT,
  sendEndpoint: process.env.SEND_ENDPOINT,
};

function service(interval: number) {
  let fetching = false;

  //TODO: add also sockets mode
  setInterval(async () => {
    if (fetching) {
      console.log(pc.yellow("Busy..."));
      return;
    }

    try {
      fetching = true;
      await scraper();
    } catch (e) {
      console.log(e);
    } finally {
      fetching = false;
    }
  }, interval);
}

const INTERVAL = !isNaN(Number(process.env.INTERVAL))
  ? Number(process.env.INTERVAL)
  : undefined;

service(INTERVAL || 5000);
