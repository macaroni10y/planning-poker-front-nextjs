import { Box, CircularProgress } from "@mui/material";

interface Props {
	title: string;
	value?: string;
	voteCompleted: boolean;
}

/**
 * indicates particular result such as average, mode, and so on
 * @param voteResult
 * @constructor
 */
const OneVoteResult = (voteResult: Props) => (
	<div className="flex flex-col justify-center items-center flex-1 m-1">
		<div>{voteResult.title}</div>
		{voteResult.voteCompleted ? (
			<div className="font-semibold text-2xl">{voteResult.value}</div>
		) : (
			<div className="p-1">
				<Box sx={{ display: "flex" }}>
					<CircularProgress size={24} color="inherit" />
				</Box>
			</div>
		)}
	</div>
);

export default OneVoteResult;
