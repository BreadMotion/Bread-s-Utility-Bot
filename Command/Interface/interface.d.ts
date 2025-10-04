import { ChatInputCommandInteraction, ApplicationCommandOptionData } from "discord.js";
export type CommandModule = {
  name: string;
  description: string;
  options: ApplicationCommandOptionData[];
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
};
