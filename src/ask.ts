import chalk from "chalk";

import { input, confirm } from "@inquirer/prompts";

export interface AskAnswer {
  projectName: string;
  isCreateFolder: boolean;
}

export const ask = async (): Promise<AskAnswer> => {
  // * Ask if you want to install a template files in the current path after showing the current path
  const isCreateFolder = !(await confirm({
    message: `Do you want to install a template files in the current path?\nIf you select no, the template files will be installed in the ${chalk.green(
      "<project-name>"
    )} folder.`,
  }));

  // * Ask for the project name
  const projectName = await input({
    message: "Enter your project name",
    validate: (input) => {
      if (!input) {
        return "Project name is required";
      }
      return true;
    },
    default: process.cwd().split("/").pop(),
  });

  return { projectName, isCreateFolder };
};
