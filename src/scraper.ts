import pc from "picocolors";
import simppeteer from "simppeteer";
import serviceConfig from "./config";
import { Task } from "./types";

const log = (message: string) => {
  console.log(pc.white("-------------------------------"));
  console.log(message);
  console.log(pc.white("-------------------------------"));
};

export async function fetchTask() {
  const url = serviceConfig.fetchEndpoint;

  return fetch(url).then((res) => res.json());
}

export async function sendTask(source: string) {
  console.log(source);
}

export async function runTask(task: Task) {
  return await simppeteer.getPageSourceHtml(task.url);
}

export async function scraper() {
  log(pc.white("Scrape started"));

  const task = await fetchTask();
  if (!task?.url) return false;

  const source = await runTask(task);
  if (!source) return false;

  sendTask(source);

  log(pc.green("Scrape ended"));

  return true;
}
