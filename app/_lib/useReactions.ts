import { useState } from "react";
import type { Reaction, ReactionType } from "@/app/_types/types";

export function useReactions() {
    const [reactions, setReactions] = useState<Reaction[]>([]);

    const removeReaction = (id: string) => {
        setReactions((prevReactions) =>
            prevReactions.filter((reaction) => reaction.id !== id),
        );
    };

    const handleReceiveReaction = (kind: ReactionType, sender: string) => {
        const newReaction: Reaction = {
            id: Math.floor(Math.random() * 100000).toString(),
            x: Math.random() * 800 - 400,
            y: Math.random() * 100 - 50,
            username: sender,
            type: kind,
        };
        setReactions((prevReactions) => [...prevReactions, newReaction]);
        setTimeout(() => removeReaction(newReaction.id), 2500);
    };

    return {
        reactions,
        handleReceiveReaction,
    };
}
