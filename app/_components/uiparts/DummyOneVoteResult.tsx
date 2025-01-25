import styles from "@/app/page.module.css";

interface Props {
    title: string;
}

/**
 * dummy component for OneVoteResult
 * @param voteResult
 * @constructor
 */
const DummyOneVoteResult = (voteResult: Props) => (
    <div className="flex flex-col justify-center items-center flex-1 m-1">
        <div>{voteResult.title}</div>
        <div
            className={`bg-gray-400 h-8 w-8 rounded ${styles.animatePlaceholder}`}
        />
    </div>
);

export default DummyOneVoteResult;
