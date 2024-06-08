import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";
import localImage from "@/app/icon.png";
import Image from "next/image";
import Link from "next/link";
import React, {type ReactElement, useState} from "react";
import { MdLogout } from "react-icons/md";
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import {CiEdit} from "react-icons/ci";
import {RxAvatar} from "react-icons/rx";
import {UserIcon} from "@storybook/icons";

interface Props {
	roomId?: string;
	onTapUserName?: () => void;
	renderTimer?: () => ReactElement;
	onLogout?: () => void;
	userName?: string;
}
const Header = (props: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	}
	const handleClose = () => {
		setAnchorEl(null);
	};
	const additionalStyles =
		props.roomId && props.onTapUserName && props.renderTimer
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
				<div className={`flex flex-row`}>
					<div className="max-sm:hidden flex">
						{props.renderTimer?.()}
					</div>
					{props.roomId && (
						<CopyToClipBoard
							copyTarget={globalThis.window?.location.href}
							displayName={props.roomId}
						/>
					)}
					{props.userName && (
						<>
							<Tooltip title={props.userName || "no name"} className="flex-1 bg-gray-600 rounded flex items-center cursor-pointer md:text-xl m-2">
								<IconButton onClick={handleClick} >
									<UserIcon size={18} color={"white"}/>
								</IconButton>
							</Tooltip>
							<Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} onKeyDown={handleClose}>
								{props.userName && (
										<MenuItem>
											<ListItemIcon>
												<RxAvatar />
											</ListItemIcon>
											{props.userName}
										</MenuItem>
								)}
								<Divider />
								{props.onTapUserName && (
									<MenuItem onClick={props.onTapUserName}>
										<ListItemIcon>
											<CiEdit />
										</ListItemIcon>
										Edit name
									</MenuItem>
								)}
								{props.onLogout && (
									<MenuItem onClick={props.onLogout}>
										<ListItemIcon>
											<MdLogout />
										</ListItemIcon>
										Logout
									</MenuItem>
								)}
							</Menu>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
