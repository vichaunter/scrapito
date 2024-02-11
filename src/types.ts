export type ServiceMode = "interval" | "sockets";

export type Task = {
  id?: string;
  url: string;
  scraperId?: string;
};

export type Result = {
  source: string;
} & Task;
