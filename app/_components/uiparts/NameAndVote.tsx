import type { Vote } from "@/app/_types/types";
import { Box, CircularProgress } from "@mui/material";
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
        <div className="p-2 flex-1 flex justify-center">{props.name}</div>
        <div className="p-2 flex-1 flex justify-center">
            {props.vote === "not yet" ? (
                <Box sx={{ display: "flex" }}>
                    <CircularProgress size={16} color="inherit" />
                </Box>
            ) : props.showVote ? (
                props.vote
            ) : (
                <FaCheck />
            )}
        </div>
    </div>
);
export default NameAndVote;
