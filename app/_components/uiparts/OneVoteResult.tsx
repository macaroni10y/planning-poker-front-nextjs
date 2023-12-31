interface Props {
	name: string;
	value: string | undefined;
	voteCompleted: boolean;
}

/**
 * indicates particular result such as average, mode, and so on
 * @param voteResult
 * @constructor
 */
const OneVoteResult = (voteResult: Props) => (
	<div className="flex flex-col border-2 border-black rounded justify-center items-center flex-1 w-24">
		<div>{voteResult.name}</div>
		<div>{voteResult.voteCompleted ? voteResult.value : "wait..."}</div>
	</div>
);

export default OneVoteResult;
