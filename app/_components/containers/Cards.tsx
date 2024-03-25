import ScrumCard from "@/app/_components/uiparts/ScrumCard";
import { allCards } from "@/app/_lib/variables";
import type { Vote } from "@/app/_types/types";
import React from "react";

interface Props {
	onSelect: (target: Vote) => void;
	selectedCard: Vote;
}

const Cards = ({ onSelect, selectedCard }: Props) => (
	<div className="ml-12 flex justify-center items-center">
		{allCards.map((it) => (
			<div key={it} className="-ml-9 sm:-ml-8 transition hover:-translate-y-4">
				<ScrumCard
					cardSymbol={it}
					onSelect={onSelect}
					selected={it === selectedCard}
				/>
			</div>
		))}
	</div>
);
export default Cards;
