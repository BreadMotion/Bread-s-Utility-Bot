import type { RESTPostAPIApplicationCommandsJSONBody } from "@discordjs/core";
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
export type CommandModule = {
  name: string;
  data: RESTPostAPIApplicationCommandsJSONBody;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
};
