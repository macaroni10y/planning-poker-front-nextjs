// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-onboarding",
        "@chromatic-com/storybook",
        "@storybook/addon-docs"
    ],
    framework: {
        name: "@storybook/nextjs-vite",
        options: {},
    },
    docs: {},
    staticDirs: ["../public"],
    viteFinal: (config) => {
        if (!config.resolve) return config;
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "../"),
        };
        return config;
    },
};
export default config;
