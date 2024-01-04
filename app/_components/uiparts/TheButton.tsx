import React from "react";

interface Props {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	text: string;
	isActive: boolean;
}

const TheButton = ({ onClick, text, isActive = true }: Props) => (
	<button
		className={`bg-pink-200 hover:bg-pink-300 font-bold py-2 px-4 rounded ${
			isActive ? "" : "opacity-50 cursor-not-allowed"
		}`}
		type="button"
		onClick={onClick}
		disabled={!isActive}
	>
		{text}
	</button>
);

export default TheButton;
