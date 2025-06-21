import type { Meta, StoryObj } from "@storybook/react";
import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";

const meta = {
    title: "CopyToClipBoard",
    component: CopyToClipBoard,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        copyTarget: {
            control: "text",
            description: "a text copied to clipboard when clicked",
        },
    },
} satisfies Meta<typeof CopyToClipBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const url: Story = {
    name: "when copy target is page URL",
    args: {
        children: "aaa",
        copyTarget: window.location.href,
    },
};
