import type { BotManager } from "./../../Class/BotManager.js";
export type EventModule = {
  name: string;
  execute: (client: BotManager) => void;
};
