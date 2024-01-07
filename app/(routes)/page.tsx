"use client";
import Header from "@/app/_components/uiparts/Header";
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
		<>
			<div className="absolute w-full">
				<Header />
			</div>
			<div className="h-screen bg-pink-50 flex items-center justify-center">
				<div className="bg-white rounded w-2/3 max-w-sm h-1/2 flex flex-col justify-center">
					<div className="flex justify-center">
						<input
							maxLength={12}
							className="w-2/3 h-12 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 mx-2 my-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-300"
							type="text"
							placeholder="input room id"
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
					<div className="flex items-center">
					<div className="mx-1 w-10/12 h-1 border-b border-b-gray-400 flex justify-center"></div>
					<div className="mx-1 text-gray-500">or</div>
					<div className="mx-1 w-10/12 h-1 border-b border-b-gray-400 flex justify-center"></div>
					</div>
					<div className="flex justify-center">
						<TheButton
							onClick={() => enter(Math.random().toString(32).substring(6))}
							text="create new room"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default Page;
