import { Spinner } from "@/app/_components/ui/base/Spinner";

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
                <Spinner size={24} />
            </div>
        )}
    </div>
);

export default OneVoteResult;
