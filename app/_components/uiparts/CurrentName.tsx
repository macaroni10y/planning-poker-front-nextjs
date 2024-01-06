import React from "react";
import { CiEdit } from "react-icons/ci";

interface Props {
	displayName: string;
	onClick: () => void;
}
const CurrentName = (props: Props) => {
	return (
		<div
			className="flex flex-1 p-2 justify-center cursor-pointer"
			onClick={props.onClick}
			onKeyDown={props.onClick}
		>
			<div className="truncate">{`name: ${props.displayName}`}</div>
			<div>
				<CiEdit />
			</div>
		</div>
	);
};

export default CurrentName;
