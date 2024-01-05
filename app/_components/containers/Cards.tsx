import ScrumCard from "@/app/_components/uiparts/ScrumCard";
import { allCards } from "@/app/_lib/variables";
import { Vote } from "@/app/_types/types";
import React from "react";

interface Props {
	onSelect: (target: Vote) => void;
	selectedCard: Vote;
}

const Cards = ({ onSelect, selectedCard }: Props) => (
	<div className="ml-1 flex justify-center items-center m-2">
		{allCards.map((it) => (
			<div className="-ml-12 transition hover:-translate-y-4">
				<ScrumCard cardSymbol={it} onSelect={onSelect} selected={it === selectedCard}/>
			</div>
		))}
	</div>
);
export default Cards;
