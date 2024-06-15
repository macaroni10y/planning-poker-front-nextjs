"use client";
import EditNameDialog from "@/app/_components/uiparts/EditNameDialog";
import Header from "@/app/_components/uiparts/Header";
import HorizontalLine from "@/app/_components/uiparts/HorizontalLine";
import TheButton from "@/app/_components/uiparts/TheButton";
import { nameNotSet, userNameAtom } from "@/app/_lib/atoms";
import { createClient } from "@/utils/supabase/client";
import { useAtom } from "jotai/index";
import { useRouter } from "next/navigation";
import React, { type KeyboardEventHandler, useEffect, useState } from "react";

const Page = () => {
	const router = useRouter();
	const [roomId, setRoomId] = useState<string>("");
	const [userName, setUserName] = useAtom(userNameAtom);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const isValid = () => !!roomId && !/\s/.test(roomId) && !roomId.includes("/");

	const enter = (roomId: string) => router.push(`/rooms/${roomId}`);

	const handleKeyDown: KeyboardEventHandler = (event) => {
		if (event.key === "Enter" && isValid()) {
			enter(roomId);
		}
	};

	const supabase = createClient();
	useEffect(() => {
		supabase.auth.getUser().then((user) => {
			if (user) {
				setUserName(user.data.user?.user_metadata.nickname || nameNotSet);
			}
		});
	}, []);

	return (
		<>
			<div className="absolute w-full">
				<Header
					userName={userName}
					onTapUserName={() => setIsDialogOpen(true)}
				/>
			</div>
			<div className="h-screen bg-pink-50 flex items-center justify-center">
				<div className="bg-white rounded-xl w-2/3 max-w-sm h-2/5 flex flex-col justify-evenly shadow-xl">
					<div className="flex flex-col">
						<div className="text-2xl font-bold text-center">Join room</div>
						<div className="flex justify-center">
							<input
								maxLength={12}
								className="w-1/2 h-12 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 mx-2 my-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-300"
								type="text"
								placeholder="Room ID"
								onChange={(event) => setRoomId(event.target.value)}
								onKeyDown={handleKeyDown}
							/>
							<TheButton
								className="w-12 h-12"
								onClick={() => enter(roomId)}
								text="→"
								isActive={isValid()}
							/>
						</div>
					</div>
					<HorizontalLine innerText="or" />
					<div className="flex justify-center">
						<TheButton
							onClick={() => enter(Math.random().toString(32).substring(6))}
							text="Create new room"
						/>
					</div>
				</div>
			</div>
			<EditNameDialog
				isOpen={isDialogOpen}
				onSubmit={async (candidate: string) => {
					setUserName(candidate);
					await supabase.auth.updateUser({
						data: { nickname: candidate },
					});
				}}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
};
export default Page;
