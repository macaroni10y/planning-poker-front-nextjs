interface Props {
	title: string;
	value? : string;
	voteCompleted: boolean;
}

/**
 * indicates particular result such as average, mode, and so on
 * @param voteResult
 * @constructor
 */
const OneVoteResult = (voteResult: Props) => (
	<div className="flex flex-col justify-center items-center flex-1">
		<div>
			{voteResult.title}
		</div>
		<div className="font-semibold text-2xl">
			{voteResult.voteCompleted ? voteResult.value : "wait..."}
		</div>
	</div>
);

export default OneVoteResult;
