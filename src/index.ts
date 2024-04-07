import { ask } from "./ask.js";
import { introduce } from "./introduce.js";
import { runTasks } from "./task.js";

void (async () => {
  // * Introduce retemple
  await introduce();

  // * Ask for the project name and the path
  const answer = await ask();

  // * Run tasks
  runTasks(answer);
})();
