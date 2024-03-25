import styles from "../../page.module.css";

/**
 * dummy component for NameAndVote
 * @constructor
 */
const DummyNameAndVote = () => (
	<div className="flex justify-around items-center border-black">
		<div className="p-2 flex-1 flex justify-center">
			<div
				className={`bg-gray-400 h-6 w-20 rounded ${styles.animatePlaceholder}`}
			/>
		</div>
		<div className="p-2 flex-1 flex justify-center">
			<div
				className={`bg-gray-400 h-6 w-6 rounded ${styles.animatePlaceholder}`}
			/>
		</div>
	</div>
);
export default DummyNameAndVote;
