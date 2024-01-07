import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";
import CurrentName from "@/app/_components/uiparts/CurrentName";
import { userNameAtom } from "@/app/_lib/atoms";
import localImage from "@/app/icon.png";
import { useAtom } from "jotai/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
	roomId?: string;
	onEdit?: () => void;
}
const Header = (props: Props) => {
	const [userName, setUserName] = useAtom(userNameAtom);
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
				<div className="md:flex md:flex-row">
					{props.roomId ? (
						<CopyToClipBoard
							copyTarget={globalThis.window?.location.href}
							displayName={props.roomId}
						/>
					) : (
						""
					)}
					{props.onEdit ? (
						<CurrentName onClick={props.onEdit} displayName={userName} />
					) : (
						""
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
