import { type ReactionType, reactionMap } from "@/app/_types/types";
import type React from "react";
type ReactionButtonProps = {
    reaction: ReactionType;
    onClick: () => void;
};

const ReactionButton: React.FC<ReactionButtonProps> = ({
    reaction,
    onClick,
}) => {
    const { emoji } = reactionMap[reaction];
    return (
        <button
            type={"button"}
            onClick={onClick}
            className="select-none flex items-center justify-center w-12 h-12 m-1 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-300 transition transform active:scale-90"
        >
            <span className="text-xl">{emoji}</span>
        </button>
    );
};
export default ReactionButton;
