import ReactionButton from "@/app/_components/uiparts/ReactionButton";
import { type ReactionType, reactionKeys } from "@/app/_types/types";
import type React from "react";
import { useState } from "react";
import { BiSmile } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

type ReactionButtonContainerProps = {
    onClick: (reactionType: ReactionType) => void;
};

const ReactionButtonContainer: React.FC<ReactionButtonContainerProps> = ({
    onClick,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <div className="max-sm:hidden relative flex flex-col items-center justify-center">
            <div
                className={`absolute -top-16 flex justify-center items-center rounded-full bg-gray-600 px-1 py-1 bg-opacity-30 transition-all duration-200 ease-in-out transform ${isExpanded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 pointer-events-none"}`}
            >
                {reactionKeys.map((reaction: ReactionType) => (
                    <ReactionButton
                        key={reaction}
                        reaction={reaction}
                        onClick={() => onClick(reaction)}
                    />
                ))}
            </div>
            <button
                type={"button"}
                className="flex items-center justify-center w-12 h-12 m-1 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-300"
                onClick={() => setIsExpanded((prev) => !prev)}
            >
                {isExpanded ? <CgClose /> : <BiSmile />}
            </button>
        </div>
    );
};

export default ReactionButtonContainer;
