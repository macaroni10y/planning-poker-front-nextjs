import ScrumCard from "@/app/_components/uiparts/ScrumCard";
import type { Meta, StoryObj } from "@storybook/react";

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
	},
};

export const skip: Story = {
	args: {
		cardSymbol: "skip",
	},
};
