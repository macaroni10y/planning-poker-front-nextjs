import type React from "react";

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
    isActive?: boolean;
    className?: string;
}

const TheButton = ({ onClick, text, isActive = true, className }: Props) => (
    <button
        className={`${
            className || "h-12 w-52 shadow"
        } transition bg-pink-200 hover:bg-pink-300 m-4 rounded ${
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
