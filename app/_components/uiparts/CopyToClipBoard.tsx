import React, { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { IoCopyOutline } from "react-icons/io5";

interface Props {
	displayName: string;
	copyTarget: string;
}

const CopyToClipBoard = (props: Props) => {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		await global.navigator.clipboard.writeText(props.copyTarget);
		setCopied(true);
		setTimeout(() => setCopied(false), 3000);
	};
	return (
		<div
			className="bg-gray-300 flex items-center border-b border-black cursor-pointer"
			onClick={copy}
			onKeyUp={copy}
		>
			<div>{props.displayName}</div>
			{copied ? <FcCheckmark /> : <IoCopyOutline />}
		</div>
	);
};

export default CopyToClipBoard;
