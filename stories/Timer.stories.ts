import type { Meta, StoryObj } from "@storybook/react";
import Timer from "@/app/_components/uiparts/Timer";

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
    },
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const example: Story = {
    name: "example",
    args: {
        currentTime: 70
    },
};
