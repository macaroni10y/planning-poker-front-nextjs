import EditNameDialog from "@/app/_components/uiparts/EditNameDialog";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Dialog",
	component: EditNameDialog,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		isOpen: {
			control: "boolean",
			description: "whether this dialog is shown or not",
		},
		onClick: {
			description: "behavior on click",
		},
		onClose: {
			description: "behavior on close",
		},
	},
} satisfies Meta<typeof EditNameDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const hoge: Story = {
	name: "text is hoge",
	args: {
		isOpen: true,
		onClick: () => alert("clicked"),
		onClose: () => alert("closed"),
	},
};
