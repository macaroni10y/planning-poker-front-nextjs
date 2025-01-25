import Timer from "@/app/_components/uiparts/Timer";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "Timer",
    component: Timer,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        currentTime: {
            control: "number",
            description: "a text to display as current time",
        },
        isPaused: {
            control: "boolean",
            description: "whether the timer is paused or not",
        },
    },
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const example: Story = {
    name: "example",
    args: {
        currentTime: 70,
        isPaused: false,
        onTapResetButton: () => alert("reset tapped"),
        onTapPauseButton: () => alert("pause tapped"),
        onTapResumeButton: () => alert("resume tapped"),
    },
};
