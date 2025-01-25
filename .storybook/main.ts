import * as path from "node:path";
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@chromatic-com/storybook",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {},
    staticDirs: ["../public"],
    webpackFinal: (config) => {
        if (!config.resolve) return config;
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "../"),
        };
        return config;
    },
};
export default config;
