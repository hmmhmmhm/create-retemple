import fs from "fs";
import chalk from "chalk";
import task from "tasuku";
import { exec } from "child_process";
import type { AskAnswer } from "./ask";

export const runTasks = async (answer: AskAnswer) => {
  // * __dirname for ESM
  const __dirname = new URL(".", import.meta.url).pathname;

  // * Run tasks
  await task.group((task) => [
    task("Cloning template files...", async ({ task }) => {
      await task("Copying template files...", async () => {
        await fs.promises.cp(
          `${__dirname}../../template`,
          answer.isCreateFolder
            ? `${process.cwd()}/${answer.projectName}`
            : process.cwd(),
          { recursive: true }
        );
      });
      await task("Replacing package.json...", async () => {
        const packageJsonPath = answer.isCreateFolder
          ? `${process.cwd()}/${answer.projectName}/package.json`
          : `${process.cwd()}/package.json`;

        const packageJson = JSON.parse(
          await fs.promises.readFile(packageJsonPath, "utf-8")
        );

        packageJson.name = answer.projectName;

        await fs.promises.writeFile(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2)
        );
      });
      await task(
        "Installing dependencies...",
        async ({ task, setError, setTitle, setStatus, setOutput }) => {
          // * call npm install in cwd
          await new Promise<void>((resolve) => {
            exec(
              `npm install`,
              {
                cwd: answer.isCreateFolder
                  ? `${process.cwd()}/${answer.projectName}`
                  : process.cwd(),
              },
              (error: any, stdout) => {
                if (error) {
                  setError(error);
                  resolve();
                  return;
                }
                setOutput(stdout);
                setTitle("Dependencies installed successfully");
                resolve();
              }
            );
          });
        }
      );
    }),
    task("Cleanup", async ({ setOutput }) => {
      setOutput(
        chalk.green(
          `\n🚀 Successfully created a new project!\n👉 ${
            answer.isCreateFolder &&
            `cd ${process.cwd()}/${answer.projectName} && `
          }npm run dev\n`
        )
      );
    }),
  ]);
};
