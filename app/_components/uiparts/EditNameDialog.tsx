import TheButton from "@/app/_components/uiparts/TheButton";
import React, { KeyboardEventHandler, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import ReactModal from "react-modal";

interface Props {
	isOpen: boolean;
	onClick: (value: string) => void;
	onClose: () => void;
}
const EditNameDialog = (props: Props) => {
	const [nameCandidate, setNameCandidate] = useState<string>("");
	const isValid = (nameCandidate: string) => !!nameCandidate;

	const handleSubmit = () => {
		if (!isValid(nameCandidate)) return;
		props.onClick(nameCandidate);
		props.onClose();
	};

	const handleKeyDown: KeyboardEventHandler = (event) => {
		if (
			event.key === "Enter" &&
			event.keyCode === 13 &&
			isValid(nameCandidate)
		) {
			props.onClick(nameCandidate);
			props.onClose();
		}
	};

	const styles: ReactModal.Styles = {
		content: {
			position: "absolute",
			top: "50%",
			left: "50%",
			width: "350px",
			height: "120px",
			transform: "translate(-50%, -50%)",
			borderRadius: "8px",
		},
	};

	return (
		<ReactModal
			style={styles}
			isOpen={props.isOpen}
			onRequestClose={props.onClose}
		>
			<div
				onClick={props.onClose}
				onKeyDown={props.onClose}
				className="absolute top-1 right-1 cursor-pointer"
			>
				<IoCloseSharp />
			</div>
			<div className="flex justify-center items-center">
				<input
					maxLength={15}
					className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-300"
					type="text"
					placeholder="input name"
					onChange={(event) => setNameCandidate(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<TheButton
					isActive={isValid(nameCandidate)}
					className="w-10 h-10"
					onClick={handleSubmit}
					text="→"
				/>
			</div>
		</ReactModal>
	);
};

ReactModal.setAppElement("body");
export default EditNameDialog;
