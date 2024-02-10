import pc from "picocolors";
import simppeteer from "simppeteer";
import serviceConfig, { log } from "./config";
import { Result, Task } from "./types";
import { compress } from "./helpers";

export async function fetchTask() {
  const url = serviceConfig.fetchEndpoint;

  return fetch(url).then((res) => res.json());
}

export async function sendTask(source: string) {
  if (!serviceConfig.sendEndpoint) {
    !serviceConfig.sendEndpoint && new Error("Missing SEND_ENDPOINT");
    return;
  }

  const data: Result = {
    id: serviceConfig.id,
    source,
  };
  try {
    return fetch(serviceConfig.sendEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
      },
      body: compress(data),
    });

    // Handle successful response here (e.g., await response.json())
  } catch (error) {
    console.error("Error sending request:", error);
    // Handle errors appropriately
  }
}

export async function runTask(task: Task) {
  return await simppeteer.getPageSourceHtml(task.url);
}

export async function scraper() {
  log(pc.white("Scrape started"));

  const task = await fetchTask();
  if (!task?.url) return false;

  const source = await runTask(task);
  if (!source) {
    log(`${pc.red("Missed source for task:")} ${pc.white(task.url)}`);
    return false;
  }

  sendTask(source);

  log(pc.green("Scrape ended"));

  return true;
}
