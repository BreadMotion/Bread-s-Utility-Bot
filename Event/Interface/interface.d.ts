import type { BotManager } from "./../../Class/BotManager.js";
export type EventModule = {
  data: { name: string };
  execute: (client: BotManager) => void;
};
