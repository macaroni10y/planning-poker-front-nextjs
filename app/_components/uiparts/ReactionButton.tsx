import type { Emoji } from "frimousse";
import type React from "react";
type ReactionButtonProps = {
    emoji: Emoji;
    onClick: () => void;
};

const ReactionButton: React.FC<ReactionButtonProps> = ({ emoji, onClick }) => {
    return (
        <button
            type={"button"}
            onClick={onClick}
            className="select-none flex items-center justify-center w-12 h-12 m-1 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-300 transition transform active:scale-90"
        >
            <span className="text-xl">{emoji.emoji}</span>
        </button>
    );
};
export default ReactionButton;
