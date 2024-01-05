import { Vote } from "@/app/_types/types";

interface Props {
	cardSymbol: Vote;
	onSelect: (target: Vote) => void;
	selected? : boolean;
}
const ScrumCard = (props: Props) => {
	const onSelectSelf = () => props.onSelect(props.cardSymbol);
	return (
		<div
			onClick={onSelectSelf}
			onKeyUp={onSelectSelf}
			className={`select-none bg-white rounded shadow-lg relative flex flex-col items-center justify-between cursor-pointer w-20 h-32 ${props.selected? "bg-pink-400": "hover:bg-pink-200"}`}
		>
			<div className="self-start">{props.cardSymbol}</div>
			<div className="text-4xl">{props.cardSymbol}</div>
			<div className="self-end">{props.cardSymbol}</div>
		</div>
	);
};

export default ScrumCard;
