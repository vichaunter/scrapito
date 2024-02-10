import pc from "picocolors";
import { serviceConfig } from ".";
import simppeteer from "simppeteer";

const log = (message: string) => {
  console.log(pc.white("-------------------------------"));
  console.log(message);
  console.log(pc.white("2-------------------------------"));
};

type Task = {
  url: string;
};

type Result = {
  id: string;
  source: string;
};

async function fetchTask() {
  const url = serviceConfig.fetchEndpoint;

  return fetch(url).then((res) => res.json());
}

async function putTask(source: string) {
  console.log(source);
}

async function runTask(task: Task) {
  return await simppeteer.getPageSourceHtml(task.url);
}

export async function scraper() {
  log(pc.white("Scrape started"));

  const task = await fetchTask();
  if (!task?.url) return false;

  const source = await runTask(task);
  if (!source) return false;

  putTask(source);

  log(pc.green("Scrape ended"));

  return true;
}
