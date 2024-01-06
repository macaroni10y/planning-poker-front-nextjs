import { Vote } from "@/app/_types/types";

interface Props {
	cardSymbol: Vote;
	onSelect: (target: Vote) => void;
	selected?: boolean;
}
const ScrumCard = (props: Props) => {
	const onSelectSelf = () => props.onSelect(props.cardSymbol);
	return (
		<div
			onClick={onSelectSelf}
			onKeyUp={onSelectSelf}
			className={`transition select-none rounded shadow-lg relative flex flex-col items-center justify-between cursor-pointer w-16 h-28 sm:w-20 sm:h-32 ${
				props.selected ? "bg-pink-400" : "bg-white hover:bg-pink-200"
			}`}
		>
			<div className="self-start">{props.cardSymbol}</div>
			<div className="text-4xl">{props.cardSymbol}</div>
			<div className="self-end">{props.cardSymbol}</div>
		</div>
	);
};

export default ScrumCard;
