import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";
import localImage from "@/app/icon.png";
import { UserIcon } from "@storybook/icons";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { type ReactElement } from "react";

interface Props {
    roomId?: string;
    onTapUserName?: () => void;
    renderTimer?: () => ReactElement;
    userName?: string;
}
const Header = (props: Props) => {
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
                    <Link
                        href="/"
                        className="text-xl font-semibold whitespace-nowrap"
                    >
                        macaroni poker
                    </Link>
                </div>
                <div className="flex flex-row">
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
                        <div onClick={props.onTapUserName} className="flex-1 bg-gray-600 rounded flex items-center cursor-pointer m-2 px-1">
                                <UserIcon size={18} color={"white"} />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
