import type React from "react";

interface Props {
	formAction: (formData: FormData) => void;
	text: string;
	isActive?: boolean;
	className?: string;
}

/**
 * Button component for form submission
 * @param formAction
 * @param text
 * @param isActive
 * @param className
 * @constructor
 */
const TheButton = ({ formAction, text, isActive = true, className }: Props) => (
	<button
		className={`${
			className || "h-12 w-52 shadow"
		} transition bg-pink-200 hover:bg-pink-300 m-4 rounded ${
			isActive ? "" : "opacity-50 cursor-not-allowed"
		}`}
		type="submit"
		formAction={formAction}
		disabled={!isActive}
	>
		{text}
	</button>
);

export default TheButton;
