import ScrumCard from "@/app/_components/uiparts/ScrumCard";
import { allCards } from "@/app/_lib/variables";
import React from "react";

const Cards = () => (
	<div className="ml-1 flex justify-center items-center m-2">
		{allCards.map((it) => (
			<div className="-ml-12 transition hover:-translate-y-4">
				<ScrumCard cardSymbol={it} />
			</div>
		))}
	</div>
);
export default Cards;
