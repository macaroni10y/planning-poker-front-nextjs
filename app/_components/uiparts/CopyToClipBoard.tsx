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
		setTimeout(() => setCopied(false), 2000);
	};
	return (
		<div
			className="flex-1 bg-gray-600 rounded flex items-center cursor-pointer md:text-xl m-2"
			onClick={copy}
			onKeyUp={copy}
		>
			<div className="mx-2">{props.displayName}</div>
			{copied ? <FcCheckmark /> : <IoCopyOutline />}
		</div>
	);
};

export default CopyToClipBoard;
