import type { Meta, StoryObj } from "@storybook/react";
import Header from "@/app/_components/uiparts/Header";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Header",
    component: Header,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const example: Story = {};
