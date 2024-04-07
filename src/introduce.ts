import chalk from "chalk";

export const introduce = async (): Promise<void> => {
  const retempleArtEnhanced: string = `
RRRRR   EEEEE  TTTTT  EEEEE M   M  PPPP  L     EEEEE
R    R  E        T    E     MM MM  P   P L     E
RRRRR   EEEE     T    EEEE  M M M  PPPP  L     EEEE
R  R    E        T    E     M   M  P     L     E
R   R   EEEEE    T    EEEEE M   M  P     LLLLL EEEEE
`;

  console.log(chalk.yellow(retempleArtEnhanced));

  console.log(chalk.yellow("Welcome to retemple! 🎉"));
  console.log(
    chalk.yellow(
      "Retemple is a CLI tool that helps you to create a react library project from a template.\n"
    )
  );
};
