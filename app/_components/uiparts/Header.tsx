import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";
import CurrentName from "@/app/_components/uiparts/CurrentName";
import { userNameAtom } from "@/app/_lib/atoms";
import { useAtom } from "jotai/index";
import Link from "next/link";
import React from "react";

interface Props {
	roomId?: string;
	onEdit?: () => void;
}
const Header = (props: Props) => {
	const [userName, setUserName] = useAtom(userNameAtom);
	return (
		<nav className="bg-gray-800 p-2 md:p-4 text-white">
			<div className="container mx-auto flex justify-between items-center">
				<div>
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
