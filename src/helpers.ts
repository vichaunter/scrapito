import zlib from "node:zlib";
import { Result } from "./types";

export function compress(data: Result) {
  return zlib.gzipSync(JSON.stringify(data));
}
