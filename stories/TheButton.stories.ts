import TheButton from "@/app/_components/uiparts/TheButton";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "TheButton",
	component: TheButton,
	parameters: {
		layout: "centered",
	},
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		text: {
			control: "text",
			description: "a text on this button",
		},
		onClick: {
			description: "an action when button is clicked",
		},
		isActive: {
			control: "boolean",
			description: "whether activate the button or not",
		},
	},
} satisfies Meta<typeof TheButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		text: "hoge",
		onClick: () => alert("clicked"),
		isActive: true,
	},
};
