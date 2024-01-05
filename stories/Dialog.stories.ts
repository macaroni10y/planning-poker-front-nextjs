import { Meta, StoryObj } from "@storybook/react";
import Dialog from "../app/_components/uiparts/Dialog";

const meta = {
	title: "Dialog",
	component: Dialog,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		displayName: {
			control: "text",
			description: "a text to display",
		},
		copyTarget: {
			control: "text",
			description: "a text copied to clipboard when clicked",
		},
	},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const hoge: Story = {
	name: "text is hoge",
	args: {
		displayName: "hoge",
		copyTarget: window.location.href,
	},
};
