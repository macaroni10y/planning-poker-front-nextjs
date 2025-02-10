import EditNameDialog from "@/app/_components/uiparts/EditNameDialog";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "Dialog",
    component: EditNameDialog,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        onSubmit: {
            description: "behavior on click",
        },
    },
} satisfies Meta<typeof EditNameDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const hoge: Story = {
    name: "text is hoge",
    args: {
        onSubmit: () => alert("clicked"),
    },
};
