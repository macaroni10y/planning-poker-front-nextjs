import ScrumCard from "@/app/_components/uiparts/ScrumCard";
import { allCards } from "@/app/_lib/variables";
import React from "react";

const Cards = () => {
	return (
		<div className="ml-1 flex justify-center items-center">
			{allCards.map((it) => (
				<div className="-ml-11 transition hover:-translate-y-2">
					<ScrumCard cardSymbol={it} />
				</div>
			))}
		</div>
	);
};
export default Cards;
