import pino from "pino";
import path from "path";

const level = process.env.LOG_LEVEL ?? "info";
const isDev = process.env.NODE_ENV !== "production";
const targets: pino.TransportTargetOptions[] = [
  {
    target: "pino-roll",
    level,
    options: {
      file: path.join(process.cwd(), "logs", "app.log"),
      frequency: "daily",
      dateFormat: "yyyy-MM-dd",
      mkdir: true,
      size: "50m",
    },
  },
];
if (isDev) {
  targets.push({
    target: "pino-pretty",
    level,
    options: { colorize: true, translateTime: "SYS:HH:MM:ss" },
  });
}
export const logger = pino({ level }, pino.transport({ targets }));
