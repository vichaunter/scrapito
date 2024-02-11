import pc from "picocolors";
import simppeteer from "simppeteer";
import serviceConfig, { log } from "./config";
import { Result, Task } from "./types";
import { compress } from "./helpers";

export async function fetchTask() {
  let retries = 0;
  const url = serviceConfig.fetchEndpoint;

  let result: Task;
  try {
    result = await fetch(url).then((res) => res.json());
  } catch (err) {
    if (retries < 3) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.error("Error fetching task, retrying");
      retries++;
      return fetchTask();
    }

    console.error("Error fetching task, retries exceeded, skipping task");
    retries = 0;
    return null;
  }

  if (result.scraperId) {
    serviceConfig.id = result.scraperId;
  }

  return result;
}

export async function sendTask(task: Task, source: string) {
  const data: Result = {
    scraperId: serviceConfig.id,
    ...task,
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

  sendTask(task, source);

  log(pc.green("Scrape ended"));

  return true;
}
