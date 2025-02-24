import { describe, expect, it, vi } from "vitest";

import { Options } from "../shared/types.js";
import { updateLocalFiles } from "./updateLocalFiles.js";

const mockReplaceInFile = vi.fn();

vi.mock("replace-in-file", () => ({
	get default() {
		return mockReplaceInFile;
	},
}));

const mockReadFileSafeAsJson = vi.fn();

vi.mock("../shared/readFileSafeAsJson.js", () => ({
	get readFileSafeAsJson() {
		return mockReadFileSafeAsJson;
	},
}));

const options = {
	access: "public",
	author: undefined,
	base: "everything",
	description: "Stub description.",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	excludeAllContributors: undefined,
	excludeCompliance: undefined,
	excludeLintJson: undefined,
	excludeLintKnip: undefined,
	excludeLintMd: undefined,
	excludeLintPackageJson: undefined,
	excludeLintPackages: undefined,
	excludeLintPerfectionist: undefined,
	excludeLintSpelling: undefined,
	excludeLintYml: undefined,
	excludeReleases: undefined,
	excludeRenovate: undefined,
	excludeTests: undefined,
	funding: undefined,
	logo: undefined,
	mode: "create",
	offline: true,
	owner: "StubOwner",
	repository: "stub-repository",
	skipGitHubApi: false,
	skipInstall: undefined,
	skipRemoval: undefined,
	skipRestore: undefined,
	skipUninstall: undefined,
	title: "Stub Title",
} satisfies Options;

describe("updateLocalFiles", () => {
	it("throws a wrapping error when replaceInFiles rejects", async () => {
		const error = new Error("Oh no!");

		mockReadFileSafeAsJson.mockResolvedValue({});
		mockReplaceInFile.mockRejectedValue(error);

		await expect(async () => {
			await updateLocalFiles({ ...options, mode: "initialize" });
		}).rejects.toThrowErrorMatchingInlineSnapshot(
			'"Failed to replace /Create TypeScript App/g with Stub Title in ./.github/**/*,./*.*"',
		);
	});

	it("replaces using the common replacements when the existing package data is null", async () => {
		mockReadFileSafeAsJson.mockResolvedValue(null);
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /Create TypeScript App/g,
			      "to": "Stub Title",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /JoshuaKGoldberg\\(\\?!\\\\/console-fail-test\\)/g,
			      "to": "StubOwner",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /create-typescript-app/g,
			      "to": "stub-repository",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": ".eslintrc.cjs",
			      "from": /\\\\/\\\\\\*\\\\n\\.\\+\\\\\\*\\\\/\\\\n\\\\n/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"author": "\\.\\+"/g,
			      "to": "\\"author\\": \\"undefined\\"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"bin": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:create": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:migrate": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./README.md",
			      "from": /## Getting Started\\.\\*## Development/gs,
			      "to": "## Development",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./.github/DEVELOPMENT.md",
			      "from": /\\\\n## Setup Scripts\\.\\*\\$/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.jsonc",
			      "from": "		\\"src/initialize/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.jsonc",
			      "from": "		\\"src/migrate/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.jsonc",
			      "from": "[\\"src/index.ts!\\", \\"script/initialize*.js\\"]",
			      "to": "\\"src/index.ts!\\"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.jsonc",
			      "from": "[\\"src/**/*.ts!\\", \\"script/**/*.js\\"]",
			      "to": "\\"src/**/*.ts!\\"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./README.md",
			      "from": "> 💙 This package is based on [@StubOwner](https://github.com/StubOwner)'s [stub-repository](https://github.com/JoshuaKGoldberg/stub-repository).",
			      "to": "> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).",
			    },
			  ],
			]
		`);
	});

	it("replaces using the common replacements when the existing package data is an empty object", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /Create TypeScript App/g,
			      "to": "Stub Title",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /JoshuaKGoldberg\\(\\?!\\\\/console-fail-test\\)/g,
			      "to": "StubOwner",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /create-typescript-app/g,
			      "to": "stub-repository",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": ".eslintrc.cjs",
			      "from": /\\\\/\\\\\\*\\\\n\\.\\+\\\\\\*\\\\/\\\\n\\\\n/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"author": "\\.\\+"/g,
			      "to": "\\"author\\": \\"undefined\\"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"bin": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:create": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:migrate": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./README.md",
			      "from": /## Getting Started\\.\\*## Development/gs,
			      "to": "## Development",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./.github/DEVELOPMENT.md",
			      "from": /\\\\n## Setup Scripts\\.\\*\\$/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.jsonc",
			      "from": "		\\"src/initialize/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.jsonc",
			      "from": "		\\"src/migrate/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.jsonc",
			      "from": "[\\"src/index.ts!\\", \\"script/initialize*.js\\"]",
			      "to": "\\"src/index.ts!\\"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.jsonc",
			      "from": "[\\"src/**/*.ts!\\", \\"script/**/*.js\\"]",
			      "to": "\\"src/**/*.ts!\\"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./README.md",
			      "from": "> 💙 This package is based on [@StubOwner](https://github.com/StubOwner)'s [stub-repository](https://github.com/JoshuaKGoldberg/stub-repository).",
			      "to": "> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).",
			    },
			  ],
			]
		`);
	});

	it("does not replace an existing description when it does not exist", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile).not.toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: ["./.github/**/*", "./*.*"],
			from: expect.anything(),
			to: options.description,
		});
	});
	it("replaces an existing description when it exists", async () => {
		const existingDescription = "Existing description.";

		mockReadFileSafeAsJson.mockResolvedValue({
			description: existingDescription,
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile).toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: ["./.github/**/*", "./*.*"],
			from: existingDescription,
			to: options.description,
		});
	});

	it("removes bin when the mode is initialize", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			version: "1.2.3",
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile).toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: "./package.json",
			from: /"bin": ".+\n/g,
			to: "",
		});
	});

	it("does not remove bin when the mode is migrate", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			version: "1.2.3",
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "migrate" });

		expect(mockReplaceInFile).not.toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: "./package.json",
			from: /"bin": ".+\n/g,
			to: "",
		});
	});

	it("resets package version to 0.0.0 when mode is initialize", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			version: "1.2.3",
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile).toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: "./package.json",
			from: /"version": "1.2.3"/g,
			to: '"version": "0.0.0"',
		});
	});

	it("does not reset package version to 0.0.0 when mode is migrate", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			version: "1.2.3",
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "migrate" });

		expect(mockReplaceInFile).not.toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: "./package.json",
			from: /"version": "1.2.3"/g,
			to: '"version": "0.0.0"',
		});
	});
});
