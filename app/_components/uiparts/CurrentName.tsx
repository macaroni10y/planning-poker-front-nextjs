import React from "react";
import { CiEdit } from "react-icons/ci";

interface Props {
	displayName: string;
	onClick: () => void;
}
const CurrentName = (props: Props) => {
	return (
		<div
			className="flex flex-1 m-2 justify-center cursor-pointer bg-gray-600 rounded"
			onClick={props.onClick}
			onKeyDown={props.onClick}
		>
			<div className="truncate flex">
				<div className="mr-1">name:</div>
				<div className="underline">{props.displayName}</div>
			</div>
			<div>
				<CiEdit />
			</div>
		</div>
	);
};

export default CurrentName;
