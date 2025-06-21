import type { Emoji } from "frimousse";
import type React from "react";
import { useEffect, useState } from "react";
import { BiPlus, BiSmile } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import {
    EmojiPicker,
    EmojiPickerContent,
    EmojiPickerFooter,
    EmojiPickerSearch,
} from "@/app/_components/uiparts/EmojiPicker";
import ReactionButton from "@/app/_components/uiparts/ReactionButton";
import { standardEmojis } from "@/app/_types/types";

type ReactionButtonContainerProps = {
    onClick: (emoji: Emoji) => void;
};

const ReactionButtonContainer: React.FC<ReactionButtonContainerProps> = ({
    onClick,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    useEffect(() => {
        if (showEmojiPicker) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showEmojiPicker]);

    const handleEmojiSelect = (emoji: Emoji) => {
        onClick(emoji);
        setShowEmojiPicker(false);
    };

    return (
        <div className="max-sm:hidden relative flex flex-col items-center justify-center">
            {/* リアクションボタン */}
            <div
                className={`absolute -top-16 flex justify-center items-center rounded-full bg-gray-600 px-1 py-1 bg-opacity-30 transition-all duration-200 ease-in-out transform ${isExpanded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 pointer-events-none"}`}
            >
                {standardEmojis.map((emoji: Emoji) => (
                    <ReactionButton
                        key={emoji.label}
                        emoji={emoji}
                        onClick={() => onClick(emoji)}
                    />
                ))}
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker(true)}
                    className="select-none flex items-center justify-center w-12 h-12 m-1 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-300 transition transform active:scale-90"
                >
                    <span className="text-xl">
                        <BiPlus />
                    </span>
                </button>
            </div>

            <button
                type="button"
                className="flex items-center justify-center w-12 h-12 m-1 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-300"
                onClick={() => setIsExpanded((prev) => !prev)}
            >
                {isExpanded ? <CgClose /> : <BiSmile />}
            </button>

            {showEmojiPicker && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowEmojiPicker(false);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setShowEmojiPicker(false);
                        }
                    }}
                >
                    <div className="bg-white rounded-lg p-2 w-80">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold">search emojis</h3>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowEmojiPicker(false)}
                            >
                                <CgClose />
                            </button>
                        </div>
                        <EmojiPicker
                            onEmojiSelect={handleEmojiSelect}
                            className="h-80 w-full"
                        >
                            <EmojiPickerSearch placeholder="search emojis..." />
                            <EmojiPickerContent />
                            <EmojiPickerFooter />
                        </EmojiPicker>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReactionButtonContainer;
