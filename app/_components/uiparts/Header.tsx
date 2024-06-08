import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";
import localImage from "@/app/icon.png";
import {
	Divider,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Menu,
	MenuItem,
	Tooltip,
} from "@mui/material";
import { UserIcon } from "@storybook/icons";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { type ReactElement, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

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
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<nav className="bg-gray-800 h-20 sm:h-16 p-2 sm:p-4 text-white flex">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex">
					<Image
						width={30}
						height={30}
						src={localImage}
						alt="macaroni poker icon"
					/>
					<Link href="/" className="text-xl font-semibold whitespace-nowrap">
						macaroni poker
					</Link>
				</div>
				<div className="flex flex-row">
					<div className="max-sm:hidden flex">{props.renderTimer?.()}</div>
					{props.roomId && (
						<CopyToClipBoard
							copyTarget={globalThis.window?.location.href}
							displayName={props.roomId}
						/>
					)}
					{props.userName && (
						<>
							<Tooltip title={props.userName || "no name"}>
								<div className="flex-1 bg-gray-600 rounded flex items-center cursor-pointer m-2">
									<IconButton onClick={handleClick}>
										<UserIcon size={18} color={"white"} />
									</IconButton>
								</div>
							</Tooltip>
							<Menu
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								onClick={handleClose}
								onKeyDown={handleClose}
							>
								{props.userName && (
									<ListItem>
										<ListItemIcon>
											<RxAvatar />
										</ListItemIcon>
										<ListItemText>{props.userName}</ListItemText>
									</ListItem>
								)}
								<Divider />
								<ListSubheader>Settings</ListSubheader>
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
