import chalk from "chalk";
import { $, execaCommand } from "execa";
import { createVitest } from "vitest/node";

const vitest = await createVitest("test", {
	include: [new URL("./verify-changes.test.ts", import.meta.url).pathname],
	update: process.argv.includes("-u"),
	watch: false,
});

import packageData from "../package.json" assert { type: "json" };
import { filesExpectedToBeChanged } from "./constants.js";

const { description, name: repository } = packageData;
const emailGithub = "github@joshuakgoldberg.com";
const emailNpm = "npm@joshuakgoldberg.com";
const owner = "JoshuaKGoldberg";
const title = "Create TypeScript App";

await $({
	stdio: "inherit",
})`c8 -o ./coverage-migrate -r html -r lcov --src src node ./bin/index.js --base everything --mode migrate --description ${description} --email-github ${emailGithub} --email-npm ${emailNpm} --owner ${owner} --title ${title} --repository ${repository} --skip-all-contributors-api --skip-github-api --skip-install`;

await vitest.start();
await vitest.exit();

const { stdout: gitStatus } = await $`git status`;
console.log(`Stdout from running \`git status\`:\n${gitStatus}`);

const indexOfUnstagedFilesMessage = gitStatus.indexOf(
	"Changes not staged for commit:",
);
if (indexOfUnstagedFilesMessage === -1) {
	throw new Error(
		`Looks like migrate didn't cause any file changes? That's ...probably incorrect? 😬`,
	);
}

const unstagedModifiedFiles = gitStatus
	.slice(indexOfUnstagedFilesMessage)
	.match(/modified: {3}(\S+)\n/g)
	.map((match) => match.split(/\s+/g)[1])
	.filter((filePath) => !filesExpectedToBeChanged.has(filePath));

console.log("Unexpected modified files are:", unstagedModifiedFiles);

if (unstagedModifiedFiles.length) {
	const gitDiffCommand = `git diff HEAD -- ${unstagedModifiedFiles.join(" ")}`;
	console.log(
		`Stdout from running \`${gitDiffCommand}\`:\n${
			(await execaCommand(gitDiffCommand)).stdout
		}`,
	);
	console.error(
		[
			"",
			"Oh no! Running the migrate script modified some files:",
			...unstagedModifiedFiles.map((filePath) => ` - ${filePath}`),
			"",
			"That likely indicates changes made to the repository without",
			"corresponding updates to templates in src/.",
			"",
			"Please search for those file(s)' name(s) under src/migrate for",
			"the corresponding template and update those as well.",
		]
			.map((line) => chalk.red(line))
			.join("\n"),
	);
	process.exitCode = 1;
}
