import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ScrumCard from "@/app/_components/features/voting/ScrumCard";

const meta = {
    title: "ScrumCard",
    component: ScrumCard,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        cardSymbol: {
            control: "text",
            description: "a symbol on this card",
        },
    },
} satisfies Meta<typeof ScrumCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const one: Story = {
    args: {
        cardSymbol: 1,
        onSelect: () => alert("clicked"),
    },
};

export const skip: Story = {
    args: {
        cardSymbol: "skip",
        onSelect: () => alert("clicked"),
    },
};
