import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";
import CurrentName from "@/app/_components/uiparts/CurrentName";
import localImage from "@/app/icon.png";
import Image from "next/image";
import Link from "next/link";
import React, { type ReactElement } from "react";

interface Props {
	roomId?: string;
	onEdit?: () => void;
	renderTimer?: () => ReactElement;
	userName?: string;
}
const Header = (props: Props) => {
	const additionalStyles =
		props.roomId && props.onEdit && props.renderTimer
			? "grid grid-rows-2 grid-cols-2"
			: "";
	return (
		<nav className="bg-gray-800 h-20 md:h-16 p-2 md:p-4 text-white flex">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex">
					<Image
						width={30}
						height={30}
						src={localImage}
						alt="macaroni poker icon"
					/>
					<Link href="/" className="text-xl font-semibold">
						macaroni poker
					</Link>
				</div>
				<div className={`md:flex md:flex-row ${additionalStyles}`}>
					{props.renderTimer?.()}
					{props.roomId && (
						<CopyToClipBoard
							copyTarget={globalThis.window?.location.href}
							displayName={props.roomId}
						/>
					)}
					{props.onEdit && (
						<CurrentName
							onClick={props.onEdit}
							displayName={props.userName || "no name"}
						/>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
