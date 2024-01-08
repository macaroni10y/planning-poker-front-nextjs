import HorizontalLine from "@/app/_components/uiparts/HorizontalLine";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "HorizontalLine",
	component: HorizontalLine,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		innerText: {
			control: "text",
			description: "a text to be displayed",
		},
	},
} satisfies Meta<typeof HorizontalLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const example: Story = {
	args: {
		innerText: "Hello, world!",
	},
};
