import { Vote } from "@/app/_types/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

interface Props {
	name: string;
	showVote: boolean;
	vote: Vote;
}

/**
 * contains a participant name and its vote status(waiting or one card)
 * @constructor
 */
const NameAndVote = (props: Props) => (
	<div className="flex justify-around items-center border-black">
		<div className="p-2">{props.name}</div>
		<div className="p-2">
			{props.vote === "not yet" ? (
				<div className="animate-spin">
					<AiOutlineLoading3Quarters />
				</div>
			) : props.showVote ? (
				props.vote
			) : (
				<FaCheck />
			)}
		</div>
	</div>
);
export default NameAndVote;
