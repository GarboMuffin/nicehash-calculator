import chalk from "chalk";
import * as http from "http";
import * as https from "https";
import * as readline from "readline";
import * as url from "url";
import { sleep } from "../../utils";

/**
 * Bare bones HTTP(S) library to reduce the need for dependencies and allows more control over certain things.
 * 
 * It's terrible. I know.
 */

export interface IRequestOptions {
  url: string;
  method?: string;
  headers?: http.OutgoingHttpHeaders;
  timeout?: number;
  pretty?: boolean;
}

export interface IResponse {
  statusCode: number;
  data: string;
}

export function request(options: IRequestOptions): Promise<IResponse> {
  const parsedUrl = url.parse(options.url);
  const hostname = parsedUrl.hostname;

  if (typeof options.pretty === "undefined") {
    options.pretty = config.pretty.enabled;
  }

  const requestOptions: https.RequestOptions = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.path,
    port: parsedUrl.port,
    headers: options.headers,
    timeout: options.timeout || 10000,
    method: options.method || "GET",
  };

  return new Promise((resolve, reject) => {
    let completed = false;

    let waitingInterval: NodeJS.Timer | undefined;
    let waitingTimeout: NodeJS.Timer | undefined;
    let hasPrintedWaitingMessage: boolean = false;

    const clearLine = () => {
      readline.clearLine(process.stdout, 0);
    };

    const resetCursor = () => {
      readline.cursorTo(process.stdout, 0);
    };

    const req = https.request(requestOptions, (res) => {
      const statusCode = res.statusCode || 200;

      let data = "";
      res.on("data", (d) => {
        data += d;
      });

      res.on("end", () => {
        completed = true;
        if (waitingInterval) {
          clearInterval(waitingInterval);
        }
        if (waitingTimeout) {
          clearTimeout(waitingTimeout);
        }
        if (hasPrintedWaitingMessage) {
          clearLine();
          resetCursor();
        }
        resolve({
          statusCode,
          data,
        });
      });
    });

    req.on("error", (err: any) => {
      reject(err);
    });

    if (options.pretty) {
      let progress = 0;
      const chars = config.pretty.characters;
      waitingTimeout = setTimeout(() => {
        if (completed) {
          return;
        }
        waitingInterval = setInterval(() => {
          if (completed) {
            return;
          }
          hasPrintedWaitingMessage = true;
          clearLine();
          resetCursor();

          process.stdout.write(chalk.gray(`Waiting for ${hostname}... ${chars[progress]}`));
          progress++;
          if (progress >= chars.length) {
            progress = 0;
          }
        }, config.pretty.characterDelay);
      }, config.pretty.initialDelay);
    }

    req.end();
  });
}

export const config = {
  pretty: {
    enabled: false,
    characters: ["/", "|", "\\", "-"],
    initialDelay: 1000,
    characterDelay: 250,
  },
};
