import { type ReactionType, reactionMap } from "@/app/_types/types";
import type React from "react";
import { useEffect } from "react";

type ReactionPopupProps = {
    reaction: ReactionType;
    username: string;
    onRemove: () => void;
};

const ReactionPopup: React.FC<ReactionPopupProps> = ({
    reaction,
    username,
    onRemove,
}) => {
    const { emoji } = reactionMap[reaction];
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove();
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="absolute flex justify-center items-center w-full top-1/2 emoji-animation">
            <div className="text-2xl bg-white shadow-md rounded-full px-4 py-2 flex items-center">
                <span className="text-sm text-gray-700 mr-2">{username}</span>
                {emoji}
            </div>
        </div>
    );
};

export default ReactionPopup;
