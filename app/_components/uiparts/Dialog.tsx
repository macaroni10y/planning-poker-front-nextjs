import TheButton from "@/app/_components/uiparts/TheButton";
import { useState } from "react";
import ReactModal from "react-modal";

interface Props {
	isOpen: boolean;
	onClick: (value: string) => void;
}
const Dialog = (props: Props) => {
	const [nameCandidate, setNameCandidate] = useState<string>("");
	const isValid = (nameCandidate: string) => !!nameCandidate;

	const handleSubmit = () => {
		if (!isValid(nameCandidate)) return;
		props.onClick(nameCandidate);
	};
	return (
		<ReactModal isOpen={props.isOpen}>
			<div>
				<input
					type="text"
					placeholder="input name"
					onChange={(event) => setNameCandidate(event.target.value)}
				/>
				<TheButton onClick={handleSubmit} text="register" />
			</div>
		</ReactModal>
	);
};

export default Dialog;
