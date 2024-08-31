import type { Vote2 } from "@/app/_models/Vote2";
import {
	joinRoom,
	resetVotes,
	revealVotes,
	submitVote,
	subscribeToRoomVotes,
} from "@/app/_repositories/voteRepository";
import { useEffect, useMemo, useState } from "react";

export const useVotes = (roomId: string) => {
	const [votes, setVotes] = useState<Vote2[]>([]);
	const canReveal = useMemo(
		() => votes.every((vote) => vote.value !== "not yet"),
		[votes],
	);

	useEffect(() => {
		const unsubscribe = subscribeToRoomVotes(roomId, (votes) => {
			setVotes(votes);
		});
		return () => unsubscribe();
	}, [roomId]);

	return { votes, joinRoom, revealVotes, submitVote, resetVotes, canReveal };
};
