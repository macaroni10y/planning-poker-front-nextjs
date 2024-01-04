import { Vote } from "@/app/_types/types";

interface Props {
	cardSymbol: Vote;
}
const ScrumCard = (props: Props) => (
	<div className="select-none bg-white rounded shadow-lg relative flex flex-col items-center justify-between hover:bg-pink-200 w-20 h-28">
		<div className="self-start">{props.cardSymbol}</div>
		<div className="text-3xl">{props.cardSymbol}</div>
		<div className="self-end">{props.cardSymbol}</div>
	</div>
);

export default ScrumCard;
