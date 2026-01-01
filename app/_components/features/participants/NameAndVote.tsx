import { Check } from "lucide-react";
import { Spinner } from "@/app/_components/ui/base/Spinner";
import type { Vote } from "@/app/_types/types";

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
        <div className="p-2 flex-1 flex justify-center">{props.name}</div>
        <div className="p-2 flex-1 flex justify-center">
            {props.vote === "not yet" ? (
                <Spinner size={16} />
            ) : props.showVote ? (
                props.vote
            ) : (
                <Check size={16} strokeWidth={4} />
            )}
        </div>
    </div>
);
export default NameAndVote;
