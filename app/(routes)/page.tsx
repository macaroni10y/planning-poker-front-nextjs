"use client";
import TheButton from "@/app/_components/uiparts/TheButton";
import { useRouter } from "next/navigation";
import { KeyboardEventHandler, useState } from "react";

const Page = () => {
	const router = useRouter();
	const [roomId, setRoomId] = useState<string>("");

	const isValid = () => !!roomId && !/\s/.test(roomId) && !roomId.includes("/");

	const enter = (roomId: string) => router.push(`/rooms/${roomId}`);

	const handleKeyDown: KeyboardEventHandler = (event) => {
		if (event.key === "Enter" && isValid()) {
			enter(roomId);
		}
	};

	return (
		<div className="flex flex-col">
			<div className="flex">
				<input className="w-100 h-12 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 m-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-300"
					type="text"
					   placeholder="input room id"
					onChange={(event) => setRoomId(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<TheButton
					onClick={() => enter(roomId)}
					text="join"
					isActive={isValid()}
				/>
			</div>
			<div className="place-self-end">
				<TheButton
					onClick={() => enter(Math.random().toString(32).substring(6))}
					text="create room"
				/>
			</div>
		</div>
	);
};
export default Page;
