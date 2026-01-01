import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import OneVoteResult from "@/app/_components/features/participants/OneVoteResult";

const meta = {
    title: "OneVoteResult",
    component: OneVoteResult,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        title: {
            control: "text",
            description: "a title explaining this result",
        },
        value: {
            control: "text",
            description:
                "a result value as a text(number, or literal 'discuss')",
        },
        voteCompleted: {
            control: "boolean",
            description: "whether vote completed or not",
        },
    },
} satisfies Meta<typeof OneVoteResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const theResultIsthree: Story = {
    args: {
        title: "result A",
        value: "3",
        voteCompleted: true,
    },
};

export const theResultIsDiscuss: Story = {
    args: {
        title: "result A",
        value: "discuss",
        voteCompleted: true,
    },
};

export const theResultIsHiddenUntilVoteCompletes: Story = {
    args: {
        title: "result A",
        voteCompleted: false,
    },
};
