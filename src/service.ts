import pc from "picocolors";
import { scraper } from "./scraper";
import { ServiceMode } from "./types";
import serviceConfig from "./config";

export function serviceInterval() {
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
  }, serviceConfig.interval);
}

export function serviceSockets() {
  throw new Error("Pending of implementation");
}

export default function service(mode: ServiceMode) {
  if (mode === "sockets") {
    serviceSockets();

    return;
  }

  serviceInterval();
}
